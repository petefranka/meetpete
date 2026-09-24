import { useEffect, useRef, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

interface RevealProps {
  id?: string;
  sx?: SxProps<Theme>;
  children: ReactNode;
}

/**
 * Section wrapper that fades/slides its children in the first time the section
 * scrolls into view. Honours prefers-reduced-motion via the CSS in index.css.
 */
export default function Reveal({ id, sx, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Box component="section" id={id} ref={ref} data-reveal="" sx={sx}>
      {children}
    </Box>
  );
}
