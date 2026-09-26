import { useRef, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { aiAssistants } from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight, Portrait } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import { ArrowButton } from '../Carousel/Carousel';
import { ARCHIVO, MONO, demoChipSx, greenPillSx } from '../shared/aiSeoStyles';

/** Ranks for the decorative "Will AI recommend you?" demo, aligned with aiAssistants. */
const demoRanks: (number | null)[] = [3, null, 1, null];

const cardSx = {
  bgcolor: 'background.paper',
  border: `2px solid ${colors.ink}`,
  borderRadius: '20px',
  p: { xs: '14px', md: '14px 14px 26px' },
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
} as const;

function MiniPill({ children, active = false, light = false }: { children: string; active?: boolean; light?: boolean }) {
  let backgroundColor = 'background.paper';
  if (active) {
    backgroundColor = 'secondary.main';
  } else if (light) {
    backgroundColor = colors.hoverPink;
  }

  return (
    <Typography
      component="span"
      sx={{
        borderRadius: 999,
        px: '10px',
        py: '4px',
        fontSize: 12,
        fontWeight: 800,
        border: `1px solid ${colors.ink}`,
        bgcolor: backgroundColor,
        color: 'text.primary',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Typography>
  );
}

/** White mini-card: decorative demo chip on top, area label + question below. */
function AreaCard({ label, question, children }: { label: string; question: string; children: ReactNode }) {
  return (
    <Box sx={cardSx}>
      <Box
        aria-hidden
        sx={{
          bgcolor: colors.track,
          borderRadius: '10px',
          p: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: 104, md: 120 },
        }}
      >
        {children}
      </Box>
      <Box>
        <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>{label}</Typography>
        <Typography sx={{ fontSize: 14, color: colors.muted }}>{question}</Typography>
      </Box>
    </Box>
  );
}

export default function SevenAreas({ onAnalyseCta }: { onAnalyseCta: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * 334, behavior: 'smooth' });

  return (
    <Reveal
      id="seven-areas"
      testId="ai-seo-seven-areas"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '56px', md: '96px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '40px', md: '40px' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '12px', md: '16px' } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
          Seven areas. <Highlight>One report.</Highlight>
        </Typography>
        <Typography sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.6, color: colors.muted, maxWidth: 640 }}>
          Every check comes with a priority, a plain-English fix and a way to test it worked.
        </Typography>
      </Box>

      <Box
        ref={trackRef}
        sx={{
          display: { xs: 'flex', md: 'grid' },
          gridTemplateColumns: { md: 'repeat(3, 1fr)' },
          gap: { xs: '14px', md: '20px' },
          overflowX: { xs: 'auto', md: 'visible' },
          scrollSnapType: { xs: 'x mandatory', md: 'none' },
          mr: { xs: '-20px', md: 0 },
          pr: { xs: '20px', md: 0 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '& > *': { scrollSnapAlign: 'start', flexShrink: 0, width: { xs: 320, md: 'auto' }, maxWidth: { xs: '86vw', md: 'none' } },
        }}
      >
        {/* Big pink card — spans two columns on desktop */}
        <Box
          sx={{
            gridColumn: { md: 'span 2' },
            bgcolor: 'secondary.main',
            border: `2px solid ${colors.ink}`,
            borderRadius: '20px',
            boxShadow: `6px 6px 0 ${colors.ink}`,
            p: { xs: '24px', md: '40px' },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            justifyContent: 'space-between',
            gap: { xs: '18px', md: '28px' },
          }}
        >
          <Box sx={{ maxWidth: 320 }}>
            <Typography sx={{ fontFamily: ARCHIVO, fontWeight: { xs: 900, md: 800 }, fontSize: { xs: 32, md: 40 }, letterSpacing: { xs: '-1.44px', md: '-0.045em' }, lineHeight: 1 }}>
              Will AI recommend you?
            </Typography>
            <Typography sx={{ mt: '8px', fontSize: { xs: 17, md: 15 }, lineHeight: 1.55, color: { xs: 'text.primary', md: '#5A4436' } }}>
              We ask ChatGPT, Claude, Perplexity and Gemini what your customers ask.
            </Typography>
          </Box>
          <Box
            aria-hidden
            sx={{
              bgcolor: 'background.paper',
              border: `2px solid ${colors.ink}`,
              borderRadius: { xs: '14px', md: '12px' },
              boxShadow: `3px 3px 0 ${colors.ink}`,
              transform: 'rotate(2deg)',
              p: { xs: '22px', md: '16px' },
              width: '100%',
              maxWidth: { xs: 'none', md: 300 },
              flex: 'none',
            }}
          >
            <Typography sx={{ fontFamily: ARCHIVO, fontWeight: { xs: 800, md: 700 }, fontSize: { xs: 17, md: 15 }, mb: { xs: '18px', md: '12px' } }}>
              &ldquo;Best florist in Leeds&rdquo;
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: { xs: '18px 16px', md: '10px 16px' } }}>
              {aiAssistants.map((name, i) => (
                <Box key={name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <Typography sx={{ fontSize: { xs: 15, md: 13 }, color: colors.muted }}>{name}</Typography>
                  {demoRanks[i] !== null ? (
                    <Typography component="span" sx={{ ...greenPillSx, fontSize: { xs: 13, md: 12 }, px: { xs: '12px', md: '10px' }, py: { xs: '6px', md: '4px' } }}>
                      ✓ #{demoRanks[i]}
                    </Typography>
                  ) : (
                    <Typography component="span" sx={{ fontSize: { xs: 14, md: 13 }, color: colors.faint }}>
                      —
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <AreaCard label="Technical SEO" question="Can search engines get in?">
          <Box sx={demoChipSx}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography sx={{ fontSize: 12, color: colors.muted }}>Mobile load</Typography>
              <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 15 }}>1.9s</Typography>
            </Box>
            <Box sx={{ mt: '6px', height: 6, borderRadius: 999, bgcolor: colors.track, overflow: 'hidden' }}>
              <Box sx={{ height: '100%', width: '78%', bgcolor: '#8EE3B5' }} />
            </Box>
            <Box sx={{ mt: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <MiniPill>HTTPS ✓</MiniPill>
              <MiniPill>Sitemap ✓</MiniPill>
            </Box>
          </Box>
        </AreaCard>

        <AreaCard label="Content" question="Is it helpful and trustworthy?">
          <Box sx={{ ...demoChipSx, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Portrait size={28} pink />
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>Written by Jo</Typography>
                <Typography sx={{ fontSize: 12, color: colors.muted, lineHeight: 1.2 }}>Florist, 12 years</Typography>
              </Box>
            </Box>
            <Typography component="span" sx={greenPillSx}>
              Expertise ✓
            </Typography>
          </Box>
        </AreaCard>

        <AreaCard label="Schema" question="Is it labelled for machines?">
          <Box sx={demoChipSx}>
            <Typography sx={{ fontSize: 11, color: colors.muted, mb: '4px' }}>Structured data</Typography>
            <Box component="code" sx={{ display: 'block', fontFamily: MONO, fontSize: 12, lineHeight: 1.7 }}>
              &quot;@type&quot;:{' '}
              <Box component="span" sx={{ bgcolor: 'secondary.main', px: '2px' }}>
                &quot;LocalBusiness&quot;
              </Box>
              <br />
              &quot;openingHours&quot;: &quot;Mo–Fr&quot;
            </Box>
          </Box>
        </AreaCard>

        <AreaCard label="Local SEO" question="Do you show up nearby?">
          <Box sx={demoChipSx}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 18 }}>★ 4.8</Typography>
              <MiniPill light>Leeds</MiniPill>
            </Box>
            <Typography sx={{ fontSize: 12, color: colors.muted, mt: '4px' }}>84 Google reviews</Typography>
          </Box>
        </AreaCard>

        <AreaCard label="E-commerce" question="If you sell online.">
          <Box sx={{ ...demoChipSx, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
            <Box
              sx={{
                height: 52,
                borderRadius: '8px',
                border: `1.5px solid ${colors.ink}`,
                background: `repeating-linear-gradient(135deg,${colors.pink} 0 6px,#FFB3D9 6px 12px)`,
              }}
            />
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Seasonal bouquet</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MiniPill>£45</MiniPill>
              <Typography component="span" sx={greenPillSx}>
                In stock
              </Typography>
            </Box>
          </Box>
        </AreaCard>

        <AreaCard label="International" question="If you have more than one language.">
          <Box sx={demoChipSx}>
            <Typography sx={{ fontSize: 12, color: colors.muted, mb: '6px' }}>Language versions</Typography>
            <Box sx={{ display: 'flex', gap: '6px' }}>
              <MiniPill active>EN</MiniPill>
              <MiniPill>FR</MiniPill>
              <MiniPill>DE</MiniPill>
            </Box>
          </Box>
        </AreaCard>

        {/* Pink CTA card — desktop only; mobile gets the carousel caption instead */}
        <Box
          sx={{
            bgcolor: colors.hoverPink,
            border: `2px solid ${colors.ink}`,
            borderRadius: '20px',
            p: '24px',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '18px',
          }}
        >
          <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: { xs: 22, md: 24 }, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            See all seven for your site.
          </Typography>
          <Button
            onClick={onAnalyseCta}
            sx={{
              borderRadius: 999,
              px: '18px',
              py: '9px',
              fontSize: 14,
              color: 'primary.contrastText',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: '#3A3733' },
            }}
          >
            Scan my site →
          </Button>
        </Box>
      </Box>

      {/* Mobile carousel controls */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.label }}>Swipe to see all seven</Typography>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <ArrowButton label="Previous area" onClick={() => scrollBy(-1)}>
            ←
          </ArrowButton>
          <ArrowButton label="Next area" onClick={() => scrollBy(1)}>
            →
          </ArrowButton>
        </Box>
      </Box>
    </Reveal>
  );
}
