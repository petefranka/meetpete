import { useEffect, useState } from 'react';

export function useLoopStep(steps: number, milliseconds: number) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(steps - 1);
      return;
    }
    const timer = window.setInterval(() => setStep((current) => (current + 1) % steps), milliseconds);
    return () => window.clearInterval(timer);
  }, [milliseconds, steps]);

  return step;
}
