import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { painStatements, painVerdicts } from '../data/content';
import { colors } from '../theme';
import Reveal from './Reveal';
import { Highlight, OutlineCta, PinkDot } from './ui';

export default function PainPoints() {
  const [selected, setSelected] = useState<number[]>([1, 4]);
  const verdict = painVerdicts[selected.length];

  const toggle = (i: number) =>
    setSelected((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  return (
    <Reveal
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '52px', md: '120px' },
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        gap: { xs: '28px', md: '56px 80px' },
        alignItems: 'start',
      }}
    >
      <Box sx={{ position: { md: 'sticky' }, top: 120, display: 'flex', flexDirection: 'column', gap: { xs: '20px', md: '28px' } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
          Everyone&apos;s banging on about AI. <Highlight>Sound familiar?</Highlight>
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: 1.6, color: colors.muted, maxWidth: 420 }}>
          Be honest. Tick the ones that sound like you.
        </Typography>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            gap: '18px',
            p: '28px',
            bgcolor: 'background.paper',
            border: `2px solid ${colors.ink}`,
            borderRadius: '14px',
            boxShadow: `5px 5px 0 ${colors.pink}`,
          }}
        >
          <Typography aria-live="polite" sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 24, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
            {verdict}
          </Typography>
          <OutlineCta component="a" href="#contact" sx={{ alignSelf: 'flex-start' }}>
            <PinkDot />Book a free call
          </OutlineCta>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {painStatements.map((statement, i) => {
          const on = selected.includes(i);
          return (
            <Box
              key={statement}
              component="button"
              type="button"
              aria-pressed={on}
              onClick={() => toggle(i)}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '22px',
                p: '24px 26px',
                borderRadius: '14px',
                border: `2px solid ${colors.ink}`,
                bgcolor: on ? 'secondary.main' : 'background.paper',
                color: 'text.primary',
                textAlign: 'left',
                font: 'inherit',
                transform: on ? 'translateX(8px)' : 'none',
                transition: 'background 0.25s, transform 0.25s',
              }}
            >
              <Box
                component="span"
                aria-hidden
                sx={{
                  flex: 'none',
                  width: 30,
                  height: 30,
                  borderRadius: '4px',
                  border: `1.5px solid ${colors.ink}`,
                  bgcolor: on ? 'background.paper' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {on ? '✓' : ''}
              </Box>
              <Typography
                component="span"
                sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: { xs: 19, md: 'clamp(19px, 1.8vw, 24px)' }, letterSpacing: '-0.02em', lineHeight: 1.25 }}
              >
                &ldquo;{statement}&rdquo;
              </Typography>
            </Box>
          );
        })}

        {/* Mobile: the verdict docks as a sticky bottom bar instead of the side panel card. */}
        <Box aria-hidden sx={{ display: { xs: 'block', md: 'none' }, height: 8 }} />
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: 'sticky',
            bottom: 14,
            zIndex: 5,
            alignItems: 'center',
            gap: '12px',
            bgcolor: 'background.paper',
            color: 'text.primary',
            border: `2px solid ${colors.ink}`,
            borderRadius: '14px',
            p: '8px 8px 8px 16px',
            boxShadow: '0 12px 30px -12px rgba(26,25,24,0.35)',
          }}
        >
          <Typography
            aria-live="polite"
            sx={{
              flex: 1,
              minWidth: 0,
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 14,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}
          >
            {verdict}
          </Typography>
          <Button
            component="a"
            href="#contact"
            sx={{
              flex: 'none',
              borderRadius: 999,
              px: '14px',
              py: '10px',
              fontSize: 13,
              color: 'text.primary',
              bgcolor: 'secondary.main',
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: colors.hoverPink },
            }}
          >
            Let&apos;s talk
          </Button>
        </Box>
      </Box>
    </Reveal>
  );
}
