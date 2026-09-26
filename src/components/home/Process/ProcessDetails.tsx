import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { processSteps } from '../../../data/content';
import { colors } from '../../../theme';
import { PinkDot } from '../../common/BrandPrimitives/BrandPrimitives';

interface ProcessDetailsProps {
  activeIndex: number;
  onChange: (index: number) => void;
}

function ResponsibilityCard({
  owner,
  children,
  accent = false,
}: {
  owner: 'You' | 'Us';
  children: string;
  accent?: boolean;
}) {
  return (
    <Box sx={{ bgcolor: accent ? 'secondary.main' : 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: '14px', p: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: { xs: '8px', md: '10px' }, fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: { xs: 13, md: 14 } }}>
        <Box component="span" aria-hidden sx={{ width: { xs: 22, md: 30 }, height: { xs: 22, md: 30 }, borderRadius: '50%', border: accent ? 'none' : `1.5px solid ${colors.ink}`, bgcolor: accent ? 'primary.main' : undefined, color: accent ? 'primary.contrastText' : undefined, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: 10, md: 13 } }}>
          {owner[0]}
        </Box>
        {owner}
      </Typography>
      <Typography sx={{ fontSize: 15, lineHeight: 1.55, color: accent ? undefined : colors.body }}>{children}</Typography>
    </Box>
  );
}

export default function ProcessDetails({ activeIndex, onChange }: ProcessDetailsProps) {
  const step = processSteps[activeIndex];

  return (
    <Box aria-live="polite" sx={{ bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: '20px', boxShadow: `5px 5px 0 ${colors.ink}`, p: { xs: '24px', md: 'clamp(24px, 3vw, 36px)' }, display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Box key={step.id} className="panel-swap" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: '32px', md: '28px 40px' }, alignItems: 'start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '12px', md: '16px' } }}>
          <Typography component="span" sx={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', bgcolor: colors.hoverPink, borderRadius: 999, px: '14px', py: { xs: '6px', md: '7px' }, fontFamily: "'Archivo', sans-serif", fontWeight: { xs: 800, md: 700 }, fontSize: { xs: 15, md: 13 } }}>
            <PinkDot size={8} />
            {step.when}
          </Typography>
          <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 'clamp(26px, 2.6vw, 34px)' } }}>
            {step.title}
          </Typography>
          <Typography sx={{ fontSize: 16, lineHeight: 1.65, color: colors.body, maxWidth: 460 }}>
            {step.summary}
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: '10px', md: '14px' } }}>
          <ResponsibilityCard owner="You">{step.you}</ResponsibilityCard>
          <ResponsibilityCard owner="Us" accent>{step.us}</ResponsibilityCard>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          {processSteps.map((item, index) => (
            <Box
              key={item.id}
              component="button"
              type="button"
              aria-label={`Go to step ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex ? 'step' : undefined}
              onClick={() => onChange(index)}
              sx={{ cursor: 'pointer', p: 0, border: 'none', height: 6, width: index === activeIndex ? { xs: 28, md: 22 } : 6, borderRadius: 999, bgcolor: index === activeIndex ? 'primary.main' : '#DAD6CF', transition: 'all 0.25s' }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Box
            component="button"
            type="button"
            aria-label="Previous step"
            disabled={activeIndex === 0}
            onClick={() => onChange(Math.max(0, activeIndex - 1))}
            sx={{ cursor: activeIndex === 0 ? 'default' : 'pointer', width: 38, height: 38, borderRadius: '50%', border: '1px solid #DAD6CF', bgcolor: 'background.paper', color: 'text.primary', fontSize: 15, opacity: activeIndex === 0 ? 0.3 : 1, '&:hover': { bgcolor: activeIndex === 0 ? 'background.paper' : 'secondary.main' } }}
          >
            ←
          </Box>
          <Box
            component="button"
            type="button"
            aria-label="Next step"
            disabled={activeIndex === processSteps.length - 1}
            onClick={() => onChange(Math.min(processSteps.length - 1, activeIndex + 1))}
            sx={{ cursor: activeIndex === processSteps.length - 1 ? 'default' : 'pointer', width: 38, height: 38, borderRadius: '50%', border: 'none', bgcolor: 'primary.main', color: 'primary.contrastText', fontSize: 15, opacity: activeIndex === processSteps.length - 1 ? 0.3 : 1, '&:hover': { bgcolor: activeIndex === processSteps.length - 1 ? 'primary.main' : '#3A3733' } }}
          >
            →
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
