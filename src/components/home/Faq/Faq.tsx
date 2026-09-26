'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { faqs } from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <Reveal
      id="faqs"
      testId="home-faq"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '52px', md: '120px' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
        gap: { xs: '28px', md: '48px 60px' },
        alignItems: 'start',
      }}
    >
      <Box sx={{ position: { md: 'sticky' }, top: 120, display: 'flex', flexDirection: 'column', gap: { xs: '18px', md: '20px' } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' }, lineHeight: { xs: 1.05, md: 1.03 } }}>
          Go on, <Highlight>ask away.</Highlight>
        </Typography>
        <Typography sx={{ fontSize: { xs: 17, md: 18 }, lineHeight: 1.6, color: colors.muted, maxWidth: { xs: 300, md: 380 } }}>
          Can&apos;t see yours? Bring it to your free call. No question is too daft.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '10px', md: '14px' }, minWidth: 0 }}>
        {faqs.map((faq, i) => {
          const isOpen = i === open;
          return (
            <Box
              key={faq.question}
              sx={{
                bgcolor: 'background.paper',
                border: `2px solid ${colors.ink}`,
                borderRadius: '14px',
                boxShadow: `5px 5px 0 ${colors.ink}`,
                overflow: 'hidden',
                px: { xs: '24px', md: 0 },
              }}
            >
              <Box
                component="button"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                sx={{
                  cursor: 'pointer',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  py: '24px',
                  px: { xs: 0, md: '28px' },
                  font: 'inherit',
                  textAlign: 'left',
                  bgcolor: 'transparent',
                  border: 'none',
                  color: 'text.primary',
                  transition: 'color 0.2s',
                  '&:hover': { color: colors.pink },
                }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    fontSize: 20,
                    transform: isOpen ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.25s',
                  }}
                >
                  ›
                </Box>
                <Typography
                  component="span"
                  sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: 1.35 }}
                >
                  {faq.question}
                </Typography>
              </Box>
              <Collapse in={isOpen}>
                <Typography
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  sx={{ px: '34px', pr: '24px', pb: '26px', fontSize: 16, lineHeight: { xs: 1.7, md: 1.65 }, color: colors.body }}
                >
                  {faq.answer}
                </Typography>
              </Collapse>
            </Box>
          );
        })}
      </Box>
    </Reveal>
  );
}
