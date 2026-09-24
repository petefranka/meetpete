import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { processSteps, processWeeks } from '../data/content';
import { colors } from '../theme';
import Reveal from './Reveal';
import { Highlight, PinkDot } from './ui';

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const step = processSteps[activeIndex];

  return (
    <Reveal
      id="process"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '52px', md: '120px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '28px', md: '48px' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '18px', md: '20px' }, maxWidth: 720 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
          From &ldquo;where do I start?&rdquo; to <Highlight>sorted</Highlight> in four weeks.
        </Typography>
        <Typography sx={{ fontSize: { xs: 17, md: 18 }, lineHeight: 1.6, color: colors.muted, maxWidth: 480 }}>
          Four steps, no jargon, and you&apos;ll always know what&apos;s coming next.
        </Typography>
      </Box>

      {/* Desktop only: gantt-style week timeline. Mobile navigates via the card dots/arrows. */}
      <Box sx={{ overflowX: 'auto', pb: '8px', display: { xs: 'none', md: 'block' } }}>
        <Box
          sx={{
            minWidth: 820,
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            columnGap: '10px',
            rowGap: '10px',
          }}
        >
          {processWeeks.map((week, i) => (
            <Box
              key={week}
              sx={{
                gridColumn: i + 1,
                gridRow: 1,
                textAlign: 'center',
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                py: '9px',
                borderRadius: '6px',
                bgcolor: i === activeIndex ? 'secondary.main' : colors.track,
                color: i === activeIndex ? 'text.primary' : colors.muted,
                transition: 'background 0.25s',
              }}
            >
              {week}
            </Box>
          ))}
          <Box
            aria-hidden
            sx={{
              gridColumn: `${step.col} / span ${step.span}`,
              gridRow: '2 / 6',
              borderRadius: '8px',
              bgcolor: 'rgba(255,138,196,0.12)',
              transition: 'grid-column 0.3s',
            }}
          />
          {processSteps.map((s, i) => {
            const on = i === activeIndex;
            return (
              <Box
                key={s.id}
                component="button"
                type="button"
                aria-pressed={on}
                onClick={() => setActiveIndex(i)}
                sx={{
                  gridColumn: `${s.col} / span ${s.span}`,
                  gridRow: s.row + 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  py: '14px',
                  px: '16px',
                  font: 'inherit',
                  textAlign: 'left',
                  borderRadius: '12px',
                  border: `2px solid ${on ? colors.ink : colors.border}`,
                  bgcolor: on ? 'secondary.main' : 'background.paper',
                  boxShadow: on ? `4px 4px 0 ${colors.ink}` : 'none',
                  transform: on ? 'translateY(-3px)' : 'none',
                  opacity: on ? 1 : 0.75,
                  color: on ? 'text.primary' : colors.muted,
                  transition: 'all 0.25s',
                  '&:hover': { opacity: 1 },
                }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    flex: 'none',
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    bgcolor: on ? 'primary.main' : colors.border,
                    color: on ? 'primary.contrastText' : colors.muted,
                  }}
                >
                  {i + 1}
                </Box>
                <Typography
                  component="span"
                  sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 16 }}
                >
                  {s.title}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        aria-live="polite"
        sx={{
          bgcolor: 'background.paper',
          border: `2px solid ${colors.ink}`,
          borderRadius: '20px',
          boxShadow: `5px 5px 0 ${colors.ink}`,
          p: { xs: '24px', md: 'clamp(24px, 3vw, 36px)' },
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        <Box
          key={step.id}
          className="panel-swap"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: '32px', md: '28px 40px' },
            alignItems: 'start',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '12px', md: '16px' } }}>
            <Typography
              component="span"
              sx={{
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                bgcolor: colors.hoverPink,
                borderRadius: 999,
                px: '14px',
                py: { xs: '6px', md: '7px' },
                fontFamily: "'Archivo', sans-serif",
                fontWeight: { xs: 800, md: 700 },
                fontSize: { xs: 15, md: 13 },
              }}
            >
              <PinkDot size={8} />
              {step.when}
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 'clamp(26px, 2.6vw, 34px)' } }}>
              {step.title}
            </Typography>
            <Typography sx={{ fontSize: 16, lineHeight: 1.65, color: colors.body, maxWidth: 460 }}>
              {step.summaryA} {step.summaryB}
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: '10px', md: '14px' } }}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                border: `2px solid ${colors.ink}`,
                borderRadius: '14px',
                p: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <Typography
                component="span"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: { xs: '8px', md: '10px' }, fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: { xs: 13, md: 14 } }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    width: { xs: 22, md: 30 },
                    height: { xs: 22, md: 30 },
                    borderRadius: '50%',
                    border: `1.5px solid ${colors.ink}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: 10, md: 13 },
                  }}
                >
                  Y
                </Box>
                You
              </Typography>
              <Typography sx={{ fontSize: 15, lineHeight: 1.55, color: colors.body }}>{step.you}</Typography>
            </Box>
            <Box
              sx={{
                bgcolor: 'secondary.main',
                border: `2px solid ${colors.ink}`,
                borderRadius: '14px',
                p: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <Typography
                component="span"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: { xs: '8px', md: '10px' }, fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: { xs: 13, md: 14 } }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    width: { xs: 22, md: 30 },
                    height: { xs: 22, md: 30 },
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: 10, md: 13 },
                  }}
                >
                  P
                </Box>
                Pete
              </Typography>
              <Typography sx={{ fontSize: 15, lineHeight: 1.55 }}>{step.pete}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <Box sx={{ display: 'flex', gap: '6px' }}>
            {processSteps.map((s, i) => (
              <Box
                key={s.id}
                component="button"
                type="button"
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                aria-current={i === activeIndex ? 'step' : undefined}
                onClick={() => setActiveIndex(i)}
                sx={{
                  cursor: 'pointer',
                  p: 0,
                  border: 'none',
                  height: 6,
                  width: i === activeIndex ? { xs: 28, md: 22 } : 6,
                  borderRadius: 999,
                  bgcolor: i === activeIndex ? 'primary.main' : '#DAD6CF',
                  transition: 'all 0.25s',
                }}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Box
              component="button"
              type="button"
              aria-label="Previous step"
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              sx={{
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                width: 38,
                height: 38,
                borderRadius: '50%',
                border: '1px solid #DAD6CF',
                bgcolor: 'background.paper',
                color: 'text.primary',
                fontSize: 15,
                opacity: activeIndex === 0 ? 0.3 : 1,
                '&:hover': { bgcolor: activeIndex === 0 ? 'background.paper' : 'secondary.main' },
              }}
            >
              ←
            </Box>
            <Box
              component="button"
              type="button"
              aria-label="Next step"
              disabled={activeIndex === processSteps.length - 1}
              onClick={() => setActiveIndex((i) => Math.min(processSteps.length - 1, i + 1))}
              sx={{
                cursor: activeIndex === processSteps.length - 1 ? 'default' : 'pointer',
                width: 38,
                height: 38,
                borderRadius: '50%',
                border: 'none',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontSize: 15,
                opacity: activeIndex === processSteps.length - 1 ? 0.3 : 1,
                '&:hover': { bgcolor: activeIndex === processSteps.length - 1 ? 'primary.main' : '#3A3733' },
              }}
            >
              →
            </Box>
          </Box>
        </Box>
      </Box>
    </Reveal>
  );
}
