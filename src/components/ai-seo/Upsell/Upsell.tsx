import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { doneForYouFeatures, proFeatures, proPrice } from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight, PinkDot } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import { ARCHIVO } from '../shared/aiSeoStyles';
import PlanComparison from './PlanComparison';

function FeatureList({ items, pinkCheck = false }: { items: string[]; pinkCheck?: boolean }) {
  return (
    <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', width: '100%' }}>
      {items.map((feature) => (
        <Box
          component="li"
          key={feature}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            py: { xs: '16px', md: '13px' },
            borderTop: `1px solid ${pinkCheck ? 'rgba(26,25,24,0.15)' : colors.borderLight}`,
            fontSize: 16,
          }}
        >
          <Box
            component="span"
            aria-hidden
            sx={{
              flex: 'none',
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: pinkCheck ? 'secondary.main' : 'primary.contrastText',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
            }}
          >
            ✓
          </Box>
          {feature}
        </Box>
      ))}
    </Box>
  );
}

/** "Ready to fix it?" — Pro vs done-for-you upsell, plus the Free/Pro comparison. */
export default function Upsell() {
  // Mobile shows one card at a time behind a segmented toggle.
  const [plan, setPlan] = useState<'diy' | 'dfy'>('dfy');

  return (
    <Reveal
      id="ready-to-fix"
      testId="ai-seo-upsell"
      sx={{
        scrollMarginTop: '80px',
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '56px', md: '110px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '40px', md: '40px' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '12px', md: '16px' }, maxWidth: 640 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
          Ready to <Highlight>fix it?</Highlight>
        </Typography>
        <Typography sx={{ fontSize: { xs: 16, md: 17 }, lineHeight: 1.6, color: colors.muted, maxWidth: { md: 400 } }}>
          Two ways forward. Do it yourself with Pro, or hand it over and have it done properly.
        </Typography>
      </Box>

      {/* Mobile segmented toggle — one card visible at a time. */}
      <Box
        sx={{
          display: { xs: 'grid', md: 'none' },
          gridTemplateColumns: '1fr 1fr',
          gap: '3px',
          bgcolor: 'background.paper',
          border: `2px solid ${colors.ink}`,
          borderRadius: 999,
          p: '4px',
        }}
      >
        {(
          [
            ['diy', 'Do it yourself'],
            ['dfy', 'Done for you'],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            aria-pressed={plan === id}
            onClick={() => setPlan(id)}
            sx={{
              borderRadius: 999,
              py: '10px',
              fontFamily: ARCHIVO,
              fontWeight: 800,
              fontSize: 13,
              textTransform: 'none',
              ...(plan === id
                ? { bgcolor: 'primary.main', color: '#F4F3F0', '&:hover': { bgcolor: 'primary.main' } }
                : { color: 'text.primary', '&:hover': { bgcolor: colors.hoverPink } }),
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: '28px', md: '28px' }, pt: '14px' }}>
        {/* Pro — do it yourself */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: `2px solid ${colors.ink}`,
            borderRadius: '18px',
            boxShadow: `5px 5px 0 ${colors.ink}`,
            p: { xs: '24px', md: '40px' },
            display: { xs: plan === 'diy' ? 'flex' : 'none', md: 'flex' },
            flexDirection: 'column',
            gap: { xs: '22px', md: '16px' },
            alignItems: 'flex-start',
          }}
        >
          <Typography
            component="span"
            sx={{ bgcolor: colors.track, borderRadius: 999, px: '12px', py: '6px', fontFamily: ARCHIVO, fontWeight: 700, fontSize: 12 }}
          >
            Do it yourself
          </Typography>
          <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: { xs: 40, md: 52 }, letterSpacing: { xs: '-2px', md: '-0.05em' }, lineHeight: 1 }}>
            Pro
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
            <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: 32, letterSpacing: '-0.04em' }}>
              £{proPrice}
            </Typography>
            <Typography sx={{ fontSize: 14, color: colors.muted }}>/month · cancel any time</Typography>
          </Box>
          <Typography sx={{ fontSize: { xs: 15, md: 16 }, lineHeight: 1.6, color: 'text.secondary' }}>
            Every fix, step by step, with monthly rescans so you know it&apos;s working.
          </Typography>
          <FeatureList items={proFeatures} />
          <Button
            component={RouterLink}
            to="/#contact"
            sx={{
              width: '100%',
              mt: 'auto',
              borderRadius: 999,
              border: `2px solid ${colors.ink}`,
              bgcolor: 'background.paper',
              color: 'text.primary',
              boxShadow: `3px 3px 0 ${colors.ink}`,
              py: { xs: '13px', md: '15px' },
              fontSize: { xs: 15, md: 16 },
              fontWeight: 800,
              '&:hover': { bgcolor: colors.hoverPink },
            }}
          >
            Start Pro for £{proPrice}/month
          </Button>
        </Box>

        {/* Done for you */}
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'secondary.main',
            border: `2px solid ${colors.ink}`,
            borderRadius: '18px',
            boxShadow: `8px 8px 0 ${colors.ink}`,
            p: { xs: '24px', md: '40px' },
            display: { xs: plan === 'dfy' ? 'flex' : 'none', md: 'flex' },
            flexDirection: 'column',
            gap: { xs: '22px', md: '16px' },
            alignItems: 'flex-start',
          }}
        >
          <Typography
            component="span"
            sx={{
              position: 'absolute',
              top: -16,
              right: 24,
              bgcolor: 'background.paper',
              border: `2px solid ${colors.ink}`,
              borderRadius: 999,
              boxShadow: `2px 2px 0 ${colors.ink}`,
              px: '12px',
              py: '5px',
              fontFamily: ARCHIVO,
              fontWeight: 800,
              fontSize: 12,
            }}
          >
            Most popular
          </Typography>
          <Typography
            component="span"
            sx={{
              bgcolor: 'background.paper',
              border: `1.5px solid ${colors.ink}`,
              borderRadius: 999,
              px: '12px',
              py: '6px',
              fontFamily: ARCHIVO,
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            Done for you
          </Typography>
          <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: { xs: 40, md: 52 }, letterSpacing: { xs: '-2px', md: '-0.05em' }, lineHeight: 1 }}>
            Have it fixed
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 15 }}>Starts with a free 30-minute call</Typography>
          <Typography sx={{ fontSize: { xs: 15, md: 16 }, lineHeight: 1.6, color: '#5A4436' }}>
            Every issue on your report gets fixed, then kept in check as AI search changes. No code, no jargon.
          </Typography>
          <FeatureList items={doneForYouFeatures} pinkCheck />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', mt: 'auto', pt: '8px' }}>
            <Button
              component={RouterLink}
              to="/#contact"
              sx={{
                borderRadius: 999,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                border: `2px solid ${colors.ink}`,
                px: '24px',
                py: { xs: '11px', md: '15px' },
                fontSize: { xs: 15, md: 16 },
                fontWeight: 800,
                gap: '10px',
                '&:hover': { bgcolor: '#3A3733' },
              }}
            >
              <PinkDot />
              Book a free call
            </Button>
            <Button
              component={RouterLink}
              to="/#services"
              sx={{
                p: 0,
                minWidth: 0,
                fontSize: 15,
                fontWeight: 800,
                color: 'text.primary',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                '&:hover': { background: 'none', color: '#5A4436' },
              }}
            >
              See the services →
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Mobile dots mirroring the toggle. */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', gap: '8px' }} aria-hidden>
        {(['diy', 'dfy'] as const).map((id) => (
          <Box
            key={id}
            sx={{
              height: 8,
              width: plan === id ? 22 : 8,
              borderRadius: 999,
              bgcolor: plan === id ? 'primary.main' : colors.track,
              border: plan === id ? 'none' : `1px solid ${colors.border}`,
              transition: 'width 0.2s ease',
            }}
          />
        ))}
      </Box>

      <PlanComparison />
    </Reveal>
  );
}
