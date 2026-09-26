import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { doneForYouFeatures, proFeatures, proPrice } from '../../../data/content';
import { colors } from '../../../theme';
import { ARCHIVO } from '../shared/aiSeoStyles';

const options = [
  {
    id: 'diy',
    label: 'Do it yourself',
    detail: `Pro · £${proPrice}/month`,
    features: proFeatures,
  },
  {
    id: 'done-for-you',
    label: 'Done for you',
    detail: 'Starts with a free 30-minute call',
    features: doneForYouFeatures,
  },
] as const;

type Option = (typeof options)[number];

function FeatureList({ features }: { features: readonly string[] }) {
  return (
    <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
      {features.map((feature) => (
        <Typography
          component="li"
          key={feature}
          sx={{
            display: 'grid',
            gridTemplateColumns: '22px minmax(0, 1fr)',
            gap: '10px',
            alignItems: 'start',
            py: '12px',
            borderTop: `1px solid ${colors.borderLight}`,
          }}
        >
          <Box
            component="span"
            aria-hidden
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'secondary.main',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 800,
            }}
          >
            ✓
          </Box>
          <Box component="span" sx={{ minWidth: 0 }}>
            {feature}
          </Box>
        </Typography>
      ))}
    </Box>
  );
}

function OptionContent({ option }: { option: Option }) {
  return (
    <>
      <Box sx={{ pb: '14px' }}>
        <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 18 }}>
          {option.label}
        </Typography>
        <Typography sx={{ mt: '3px', fontSize: 13, color: colors.muted }}>
          {option.detail}
        </Typography>
      </Box>
      <FeatureList features={option.features} />
    </>
  );
}

export default function PlanComparison() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedOption = options[selectedIndex];

  return (
    <Box sx={{ bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: '16px', overflow: 'hidden' }}>
      <Button
        fullWidth
        aria-expanded={open}
        aria-controls="compare-options"
        onClick={() => setOpen((value) => !value)}
        sx={{
          justifyContent: 'space-between',
          px: { xs: '18px', md: '24px' },
          py: { xs: '18px', md: '24px' },
          borderRadius: 0,
          color: 'text.primary',
          fontSize: { xs: 15, md: 16 },
          fontWeight: 800,
          fontFamily: ARCHIVO,
          textTransform: 'none',
          '&:hover': { bgcolor: colors.bg },
        }}
      >
        Compare your options
        <Box
          component="span"
          aria-hidden
          sx={{
            flex: 'none',
            width: 26,
            height: 26,
            borderRadius: '50%',
            border: `1.5px solid ${colors.ink}`,
            bgcolor: open ? 'secondary.main' : 'transparent',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {open ? '−' : '+'}
        </Box>
      </Button>
      <Collapse in={open}>
        <Box id="compare-options" sx={{ borderTop: `2px solid ${colors.ink}` }}>
          <Box
            role="tablist"
            aria-label="Comparison options"
            sx={{
              display: { xs: 'grid', md: 'none' },
              gridTemplateColumns: '1fr 1fr',
              gap: '3px',
              m: '16px',
              p: '4px',
              border: `2px solid ${colors.ink}`,
              borderRadius: 999,
            }}
          >
            {options.map((option, index) => {
              const selected = index === selectedIndex;
              return (
                <Button
                  key={option.id}
                  role="tab"
                  id={`comparison-${option.id}-tab`}
                  aria-selected={selected}
                  aria-controls={`comparison-${option.id}-panel`}
                  onClick={() => setSelectedIndex(index)}
                  sx={{
                    minWidth: 0,
                    borderRadius: 999,
                    px: '10px',
                    py: '10px',
                    bgcolor: selected ? 'primary.main' : 'transparent',
                    color: selected ? 'primary.contrastText' : 'text.primary',
                    fontFamily: ARCHIVO,
                    fontSize: 12,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    textTransform: 'none',
                    whiteSpace: 'normal',
                    '&:hover': { bgcolor: selected ? 'primary.main' : colors.hoverPink },
                  }}
                >
                  {option.label}
                </Button>
              );
            })}
          </Box>

          <Box
            role="tabpanel"
            id={`comparison-${selectedOption.id}-panel`}
            aria-labelledby={`comparison-${selectedOption.id}-tab`}
            sx={{ display: { xs: 'block', md: 'none' }, px: '18px', pb: '18px' }}
          >
            <OptionContent option={selectedOption} />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            {options.map((option, index) => (
              <Box
                key={option.id}
                sx={{
                  minWidth: 0,
                  p: '24px',
                  borderLeft: index === 0 ? 'none' : `1px solid ${colors.border}`,
                }}
              >
                <OptionContent option={option} />
              </Box>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
