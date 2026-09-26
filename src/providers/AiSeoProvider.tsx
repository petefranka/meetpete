'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { websiteDomainSchema, type AiSeoStatus } from '../models';

interface AiSeoContextValue {
  domain: string;
  inputRef: RefObject<HTMLInputElement | null>;
  status: AiSeoStatus;
  validationError: string | null;
  setDomain: (domain: string) => void;
  startAnalysis: (domain?: string) => boolean;
  finishAnalysis: () => void;
  resetAnalysis: () => void;
  focusDomainInput: () => void;
}

const AiSeoContext = createContext<AiSeoContextValue | null>(null);

export function AiSeoProvider({ children }: { children: ReactNode }) {
  const [domain, setDomainValue] = useState('');
  const [status, setStatus] = useState<AiSeoStatus>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setDomain = useCallback((value: string) => {
    setDomainValue(value);
    setValidationError(null);
  }, []);

  const startAnalysis = useCallback(
    (value?: string) => {
      const result = websiteDomainSchema.safeParse(value ?? domain);
      if (!result.success) {
        setValidationError(result.error.issues[0]?.message ?? 'Enter a valid website address.');
        inputRef.current?.focus();
        return false;
      }
      setDomainValue(result.data);
      setValidationError(null);
      setStatus('scanning');
      return true;
    },
    [domain],
  );

  const finishAnalysis = useCallback(() => {
    setStatus('results');
    requestAnimationFrame(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const resetAnalysis = useCallback(() => {
    setStatus('idle');
    setValidationError(null);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }, []);

  const focusDomainInput = useCallback(() => {
    document.getElementById('ai-seo-hero')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 450);
  }, []);

  const value = useMemo(
    () => ({
      domain,
      inputRef,
      status,
      validationError,
      setDomain,
      startAnalysis,
      finishAnalysis,
      resetAnalysis,
      focusDomainInput,
    }),
    [domain, finishAnalysis, focusDomainInput, resetAnalysis, setDomain, startAnalysis, status, validationError],
  );

  return <AiSeoContext.Provider value={value}>{children}</AiSeoContext.Provider>;
}

export function useAiSeo() {
  const context = useContext(AiSeoContext);
  if (!context) {
    throw new Error('useAiSeo must be used within an AiSeoProvider.');
  }
  return context;
}
