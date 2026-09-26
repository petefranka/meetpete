import { useRef, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { colors } from '../../../theme';
import { ARCHIVO } from '../shared/aiSeoStyles';

const arrowSx = {
  width: 40,
  height: 40,
  border: `2px solid ${colors.ink}`,
  bgcolor: 'background.paper',
  color: colors.ink,
  fontSize: 17,
  fontFamily: ARCHIVO,
  flexShrink: 0,
  '&:hover': { bgcolor: colors.hoverPink },
} as const;

/** Circular ink-outline arrow button used by the prototype carousels. */
export function ArrowButton({ label, onClick, children }: { label: string; onClick: () => void; children: string }) {
  return (
    <IconButton aria-label={label} onClick={onClick} sx={arrowSx}>
      {children}
    </IconButton>
  );
}

/**
 * Mobile card carousel from the prototype: bold heading with circular ink
 * arrow buttons, then a snap-scrolling row of fixed-width cards.
 */
export default function Carousel({
  heading,
  children,
  cardWidth = 203,
}: {
  heading: string;
  children: ReactNode;
  cardWidth?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * (cardWidth + 14), behavior: 'smooth' });

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: '18px' }}>
        <Typography
          component="h3"
          sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 22, letterSpacing: '-0.66px', color: colors.ink }}
        >
          {heading}
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <ArrowButton label={`Previous ${heading}`} onClick={() => scrollBy(-1)}>
            ←
          </ArrowButton>
          <ArrowButton label={`Next ${heading}`} onClick={() => scrollBy(1)}>
            →
          </ArrowButton>
        </Box>
      </Box>
      <Box
        ref={trackRef}
        sx={{
          display: 'flex',
          gap: '14px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          pb: '6px',
          mr: '-20px',
          pr: '20px',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '& > *': { scrollSnapAlign: 'start', flexShrink: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
