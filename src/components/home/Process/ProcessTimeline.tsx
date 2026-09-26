import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { processSteps, processWeeks } from '../../../data/content';
import { colors } from '../../../theme';

interface ProcessTimelineProps {
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function ProcessTimeline({ activeIndex, onChange }: ProcessTimelineProps) {
  const step = processSteps[activeIndex];

  return (
    <Box sx={{ overflowX: 'auto', pb: '8px', display: { xs: 'none', md: 'block' } }}>
      <Box sx={{ minWidth: 820, display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', columnGap: '10px', rowGap: '10px' }}>
        {processWeeks.map((week, index) => (
          <Box
            key={week}
            sx={{ gridColumn: index + 1, gridRow: 1, textAlign: 'center', fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: 11, py: '9px', borderRadius: '6px', bgcolor: index === activeIndex ? 'secondary.main' : colors.track, color: 'text.primary', transition: 'background 0.25s' }}
          >
            {week}
          </Box>
        ))}
        <Box aria-hidden sx={{ gridColumn: `${step.col} / span ${step.span}`, gridRow: '2 / 6', borderRadius: '8px', bgcolor: 'rgba(255,138,196,0.12)', transition: 'grid-column 0.3s' }} />
        {processSteps.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <Box
              key={item.id}
              component="button"
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(index)}
              sx={{ gridColumn: `${item.col} / span ${item.span}`, gridRow: index + 2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', py: '14px', px: '16px', font: 'inherit', textAlign: 'left', borderRadius: '12px', border: `2px solid ${colors.ink}`, bgcolor: selected ? 'secondary.main' : 'background.paper', boxShadow: selected ? `4px 4px 0 ${colors.ink}` : 'none', transform: selected ? 'translateY(-3px)' : 'none', opacity: selected ? 1 : 0.8, color: 'text.primary', transition: 'all 0.25s', '&:hover': { opacity: 1 } }}
            >
              <Box component="span" aria-hidden sx={{ flex: 'none', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 12, bgcolor: selected ? 'primary.main' : colors.ink, color: selected ? 'primary.contrastText' : '#fff' }}>
                {index + 1}
              </Box>
              <Typography component="span" sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 16 }}>
                {item.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
