import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { testimonials } from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight, Portrait } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';

const DESKTOP_CARD_WIDTH = 440;
const DESKTOP_CARD_GAP = 24;
const MOBILE_CARD_WIDTH = 300;
const MOBILE_CARD_GAP = 16;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const cardWidth = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
  const cardGap = isMobile ? MOBILE_CARD_GAP : DESKTOP_CARD_GAP;

  const maxIndex = () => {
    const viewport = viewportRef.current;
    if (!viewport) return testimonials.length - 1;
    const visible = Math.max(1, Math.floor((viewport.clientWidth + cardGap) / (cardWidth + cardGap)));
    return Math.max(0, testimonials.length - visible);
  };

  const clampIndex = (i: number) => Math.max(0, Math.min(maxIndex(), i));
  const go = (i: number) => setIndex(clampIndex(i));
  const atStart = index <= 0;
  const atEnd = index >= maxIndex();

  return (
    <Reveal
      testId="home-testimonials"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        py: { xs: '52px', md: '120px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '28px', md: '48px' },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          px: 'clamp(20px, 5vw, 96px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '24px 48px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '18px', md: '20px' } }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' } }}>
            Happy humans, <Highlight>kind words.</Highlight>
          </Typography>
          <Typography sx={{ fontSize: { xs: 17, md: 18 }, lineHeight: 1.6, color: colors.muted }}>
            What changed for businesses like yours.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Box
            component="button"
            type="button"
            aria-label="Previous testimonials"
            disabled={atStart}
            onClick={() => go(index - 1)}
            sx={{
              cursor: atStart ? 'default' : 'pointer',
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: { xs: `2px solid ${colors.ink}`, md: `1.5px solid ${colors.ink}` },
              bgcolor: 'background.paper',
              color: 'text.primary',
              fontSize: 17,
              opacity: atStart ? 0.35 : 1,
              '&:hover': { bgcolor: atStart ? 'background.paper' : 'secondary.main' },
            }}
          >
            ←
          </Box>
          <Box
            component="button"
            type="button"
            aria-label="Next testimonials"
            disabled={atEnd}
            onClick={() => go(index + 1)}
            sx={{
              cursor: atEnd ? 'default' : 'pointer',
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: { xs: `2px solid ${colors.ink}`, md: `1.5px solid ${colors.ink}` },
              bgcolor: 'background.paper',
              color: 'text.primary',
              fontSize: 17,
              opacity: atEnd ? 0.35 : 1,
              '&:hover': { bgcolor: atEnd ? 'background.paper' : 'secondary.main' },
            }}
          >
            →
          </Box>
        </Box>
      </Box>
      <Box ref={viewportRef} sx={{ overflow: 'hidden', px: 'clamp(20px, 5vw, 96px)' }}>
        <Box
          sx={{
            display: 'flex',
            gap: `${cardGap}px`,
            transform: `translateX(${-index * (cardWidth + cardGap)}px)`,
            transition: 'transform 0.5s cubic-bezier(.2,.8,.2,1)',
            pt: '10px',
            pb: { xs: '16px', md: '10px' },
          }}
        >
          {testimonials.map((t, i) => (
            <Box
              key={t.name}
              sx={{
                position: 'relative',
                flex: isMobile ? `0 0 ${MOBILE_CARD_WIDTH}px` : `0 0 min(${DESKTOP_CARD_WIDTH}px, 78vw)`,
                bgcolor: 'background.paper',
                border: `2px solid ${colors.ink}`,
                borderRadius: '16px',
                boxShadow: `6px 6px 0 ${colors.pink}`,
                p: '44px 30px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
                opacity: isMobile && i < index ? 0.35 : 1,
                transition: 'opacity 0.4s',
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: { xs: -28, md: -24 },
                  left: 24,
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900,
                  fontSize: 80,
                  lineHeight: 1,
                  color: 'secondary.main',
                  WebkitTextStroke: `2px ${colors.ink}`,
                }}
              >
                “
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: 20, md: 'clamp(20px, 1.9vw, 24px)' },
                  lineHeight: { xs: 1.3, md: 1.35 },
                  letterSpacing: { xs: '-0.02em', md: '-0.015em' },
                  textWrap: 'pretty',
                }}
              >
                {t.quote}
              </Typography>
              <Box
                sx={{
                  mt: 'auto',
                  pt: '18px',
                  borderTop: `1px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: '12px', md: '14px' },
                }}
              >
                <Portrait size={44} pink />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: { xs: 800, md: 700 }, fontSize: { xs: 16, md: 15 } }}>
                    {t.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: colors.muted }}>{t.business}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ px: 'clamp(20px, 5vw, 96px)', display: 'flex', gap: '6px' }}>
        {testimonials.map((t, i) => (
          <Box
            key={t.name}
            component="button"
            type="button"
            aria-label={`Go to testimonial ${i + 1} of ${testimonials.length}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => go(i)}
            sx={{
              cursor: 'pointer',
              p: 0,
              border: 'none',
              height: { xs: 8, md: 6 },
              width: i === index ? { xs: 28, md: 22 } : { xs: 8, md: 6 },
              borderRadius: 999,
              bgcolor: i === index ? 'primary.main' : { xs: '#D6D1C8', md: colors.border },
              transition: 'all 0.3s',
            }}
          />
        ))}
      </Box>
    </Reveal>
  );
}
