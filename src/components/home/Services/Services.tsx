'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { services } from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import AiSeoStrip from './AiSeoStrip';
import ServiceCard from './ServiceCard';

export default function Services() {
  const [tab, setTab] = useState(0);

  return (
    <Reveal
      id="services"
      testId="home-services"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '52px', md: '120px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '28px', md: '48px' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '18px', md: '20px' } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
          Two ways to get <Highlight>found.</Highlight>
        </Typography>
        <Typography sx={{ fontSize: { xs: 17, md: 18 }, lineHeight: 1.6, color: colors.muted }}>
          Pick one, or get both. They work best together.
        </Typography>
      </Box>
      <Box
        role="tablist"
        aria-label="Services"
        sx={{ display: { xs: 'flex', lg: 'none' }, border: `2px solid ${colors.ink}`, borderRadius: 999, p: '4px', bgcolor: 'background.paper' }}
      >
        {services.map((service, index) => {
          const selected = index === tab;
          return (
            <Box
              key={service.id}
              component="button"
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(index)}
              sx={{ flex: 1, cursor: 'pointer', border: 'none', font: 'inherit', fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 15, py: '12px', borderRadius: 999, bgcolor: selected ? 'primary.main' : 'transparent', color: selected ? 'primary.contrastText' : 'text.primary', transition: 'background 0.2s' }}
            >
              {service.tab}
            </Box>
          );
        })}
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: '20px', md: '28px' } }}>
        {services.map((service, index) => (
          <Box key={service.id} sx={{ display: { xs: index === tab ? 'block' : 'none', lg: 'block' } }}>
            <ServiceCard service={service} />
          </Box>
        ))}
      </Box>
      <Box aria-hidden sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center', gap: '6px' }}>
        {services.map((service, index) => (
          <Box key={service.id} component="span" sx={{ width: index === tab ? 22 : 8, height: 8, borderRadius: 999, bgcolor: index === tab ? 'primary.main' : colors.border, transition: 'all 0.25s' }} />
        ))}
      </Box>
      <AiSeoStrip />
    </Reveal>
  );
}
