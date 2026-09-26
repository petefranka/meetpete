'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../../../theme';
import { Highlight } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import ProcessDetails from './ProcessDetails';
import ProcessTimeline from './ProcessTimeline';

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Reveal
      id="process"
      testId="home-process"
      sx={{ borderTop: `1px solid ${colors.border}`, px: 'clamp(20px, 5vw, 96px)', py: { xs: '52px', md: '120px' }, display: 'flex', flexDirection: 'column', gap: { xs: '28px', md: '48px' } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '18px', md: '20px' }, maxWidth: 720 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
          From &ldquo;where do I start?&rdquo; to <Highlight>sorted</Highlight> in four weeks.
        </Typography>
        <Typography sx={{ fontSize: { xs: 17, md: 18 }, lineHeight: 1.6, color: colors.muted, maxWidth: 480 }}>
          Four steps, no jargon, and you&apos;ll always know what&apos;s coming next.
        </Typography>
      </Box>
      <ProcessTimeline activeIndex={activeIndex} onChange={setActiveIndex} />
      <ProcessDetails activeIndex={activeIndex} onChange={setActiveIndex} />
    </Reveal>
  );
}
