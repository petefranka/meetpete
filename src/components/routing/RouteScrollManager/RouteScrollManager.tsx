import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MAX_RENDER_FRAMES = 60;

export default function RouteScrollManager() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let frame = 0;
    let attempts = 0;
    const scrollToTarget = () => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      attempts += 1;
      if (attempts < MAX_RENDER_FRAMES) {
        frame = requestAnimationFrame(scrollToTarget);
      }
    };

    frame = requestAnimationFrame(scrollToTarget);
    return () => cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}
