import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { contactEmail, mixNeeds, mixSizes } from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight, PillButton, TextArea, TextInput } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import { createMailtoHref } from '../../common/createMailtoHref';

export default function Pricing() {
  const [mixerOpen, setMixerOpen] = useState(true);
  const [picked, setPicked] = useState<string[]>([]);
  const [team, setTeam] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [quoteNote, setQuoteNote] = useState(false);

  const togglePicked = (label: string) =>
    setPicked((cur) => (cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label]));

  const quoteHref = () => {
    const subject = 'Quote request — mix my own flavour';
    const lines = [
      `Name: ${name || '-'}`,
      `Email: ${email || '-'}`,
      '',
      `Mix: ${picked.length ? picked.join(', ') : 'Nothing picked yet'}`,
      `Team size: ${mixSizes[team]}`,
      '',
      notes,
    ];
    return createMailtoHref({ to: contactEmail, subject, body: lines.join('\n') });
  };

  return (
    <Reveal
      id="pricing"
      testId="home-pricing"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '56px', md: '120px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '28px', md: '48px' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '18px', md: '20px' }, maxWidth: 640 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
          Make your own <Highlight>flavour.</Highlight>
        </Typography>
        <Typography sx={{ fontSize: { xs: 17, md: 18 }, lineHeight: 1.6, color: colors.muted, maxWidth: 460 }}>
          Pick the bits that sound like they&apos;d suit you, and you&apos;ll get a quote tailored to your business.
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          border: `2px solid ${colors.ink}`,
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px 32px',
            flexWrap: 'wrap',
            p: { xs: '20px', md: 'clamp(24px, 3vw, 36px)' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>
              Build your mix
            </Typography>
            <Typography sx={{ fontSize: 14, color: colors.muted }}>
              Not sure what you need? Tick what sounds useful and we&apos;ll talk it through on your free call.
            </Typography>
          </Box>
          <PillButton aria-expanded={mixerOpen} aria-controls="mix-my-own" onClick={() => setMixerOpen((v) => !v)}>
            {mixerOpen ? 'Close the mixer' : 'Open the mixer'}
          </PillButton>
        </Box>
        <Collapse in={mixerOpen}>
          <Box
            id="mix-my-own"
            sx={{
              borderTop: `2px solid ${colors.ink}`,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            }}
          >
            <Box
              sx={{
                p: { xs: '20px', md: 'clamp(24px, 3vw, 36px)' },
                borderRight: { md: `1px solid ${colors.border}` },
                borderBottom: { xs: `1px solid ${colors.input}`, md: 'none' },
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: '22px', md: '28px' },
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 15, mb: '12px' }}>
                  1. What do you need?
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: '8px', md: '10px' } }}>
                  {mixNeeds.map((label) => {
                    const on = picked.includes(label);
                    return (
                      <Box
                        key={label}
                        component="button"
                        type="button"
                        aria-pressed={on}
                        onClick={() => togglePicked(label)}
                        sx={{
                          cursor: 'pointer',
                          font: 'inherit',
                          fontFamily: "'Archivo', sans-serif",
                          fontWeight: 700,
                          fontSize: 14,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          px: { xs: '14px', md: '16px' },
                          py: '10px',
                          borderRadius: 999,
                          border: `2px solid ${on ? colors.ink : colors.border}`,
                          bgcolor: on ? 'secondary.main' : 'background.paper',
                          transition: 'all 0.2s',
                        }}
                      >
                        <Box component="span" aria-hidden>{on ? '✓' : '+'}</Box>
                        {label}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box>
                <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 15, mb: '12px' }}>
                  2. How big is your business?
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: '8px', md: '10px' } }}>
                  {mixSizes.map((label, i) => {
                    const on = i === team;
                    return (
                      <Box
                        key={label}
                        component="button"
                        type="button"
                        aria-pressed={on}
                        onClick={() => setTeam(i)}
                        sx={{
                          cursor: 'pointer',
                          font: 'inherit',
                          fontFamily: "'Archivo', sans-serif",
                          fontWeight: 700,
                          fontSize: 14,
                          px: { xs: '16px', md: '18px' },
                          py: '10px',
                          borderRadius: 999,
                          border: `2px solid ${on ? colors.ink : colors.border}`,
                          bgcolor: on ? 'secondary.main' : 'background.paper',
                          transition: 'all 0.2s',
                        }}
                      >
                        {label}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
            <Box
              component="form"
              sx={{ p: { xs: '20px', md: 'clamp(24px, 3vw, 36px)' }, display: 'flex', flexDirection: 'column', gap: { xs: '10px', md: '14px' } }}
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                setQuoteNote(true);
                window.location.href = quoteHref();
              }}
            >
              <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 15, mb: '4px' }}>
                3. Tell us a bit more
              </Typography>
              <TextInput label="Your name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              <TextInput label="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextArea
                label="Anything else?"
                placeholder="Anything else? Tell us about your business, your tools, or what's driving you mad."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Box
                component="button"
                type="submit"
                sx={{
                  cursor: 'pointer',
                  font: 'inherit',
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: 'primary.contrastText',
                  bgcolor: 'primary.main',
                  border: `2px solid ${colors.ink}`,
                  borderRadius: 999,
                  py: '15px',
                  px: '26px',
                  mt: '4px',
                  '&:hover': { bgcolor: '#3A3733' },
                }}
              >
                Send my quote request →
              </Box>
              {quoteNote && (
                <Typography role="status" sx={{ fontSize: 14, color: colors.muted }}>
                  Your email app should open with everything filled in — press send and it lands with Pete. Nothing
                  is sent from this page itself.
                </Typography>
              )}
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Reveal>
  );
}
