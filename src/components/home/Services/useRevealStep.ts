import { useEffect, useState } from 'react';

export function useRevealStep(steps: number, milliseconds: number) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(steps - 1);
      return;
    }
    if (step >= steps - 1) return;

    const timer = window.setTimeout(
      () => setStep((current) => Math.min(current + 1, steps - 1)),
      milliseconds,
    );
    return () => window.clearTimeout(timer);
  }, [milliseconds, step, steps]);

  return step;
}
