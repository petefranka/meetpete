import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { actionPlan } from '../../../data/content';
import type { Priority } from '../../../models';
import { colors } from '../../../theme';
import { Highlight } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import { ARCHIVO, priorityStyles } from '../shared/aiSeoStyles';
import ActionItemCard from './ActionItemCard';
import QuickWinsSection from './QuickWinsSection';

const PRIORITY_ORDER: Priority[] = ['Critical', 'High', 'Medium', 'Low', 'Passing'];

export default function ActionPlan() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const counts = PRIORITY_ORDER.map((priority) => ({
    priority,
    count: actionPlan.filter((item) => item.priority === priority).length,
  }));

  return (
    <>
      <QuickWinsSection />
      <Reveal
        id="action-plan"
        sx={{ scrollMarginTop: '96px', borderTop: `1px solid ${colors.border}`, px: 'clamp(20px, 5vw, 96px)', py: { xs: '48px', md: '96px' }, display: 'flex', flexDirection: 'column', gap: { xs: '20px', md: '32px' } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '14px', md: '18px' } }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
            Your action <Highlight>plan.</Highlight>
          </Typography>
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {counts.map(({ priority, count }) => (
              <Typography
                key={priority}
                component="span"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: { xs: '7px', md: 0 }, bgcolor: { xs: 'background.paper', md: priorityStyles[priority].bg }, color: 'text.primary', border: `1px solid ${colors.ink}`, borderRadius: 999, px: '12px', py: { xs: '7px', md: '5px' }, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 13 }}
              >
                <Box component="span" aria-hidden sx={{ display: { xs: 'inline-block', md: 'none' }, width: 10, height: 10, borderRadius: '50%', bgcolor: priorityStyles[priority].bg, border: `1px solid ${colors.ink}` }} />
                {priority} · {count}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {actionPlan.map((item, index) => (
            <ActionItemCard
              key={item.headline}
              item={item}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </Box>
      </Reveal>
    </>
  );
}
