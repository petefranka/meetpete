import { useState, type ChangeEvent, type FormEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { aiSeoResult, contactEmail } from '../../../data/content';
import { colors } from '../../../theme';
import { createMailtoHref } from '../../common/createMailtoHref';
import Reveal from '../../common/Reveal/Reveal';
import { ARCHIVO } from '../shared/aiSeoStyles';

/**
 * "Email me this report" strip. Submitting opens the visitor's email app with a
 * pre-filled draft to us — nothing is sent from the page itself.
 */
export default function EmailReport({ domain }: { domain: string }) {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = 'My AI visibility report';
    const lines = [
      `Website: ${domain}`,
      `AI Visibility Score: ${aiSeoResult.score}/100`,
      aiSeoResult.verdict,
      aiSeoResult.issueSummary,
      '',
      `My email: ${email || '-'}`,
    ];
    window.location.href = createMailtoHref({
      to: contactEmail,
      subject,
      body: lines.join('\n'),
    });
    setNote(true);
  };

  return (
    <Reveal
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        pt: { xs: '32px', md: '72px' },
        pb: { xs: '64px', md: '72px' },
      }}
    >
      <Box
        id="email-report"
        sx={{
          scrollMarginTop: '96px',
          bgcolor: colors.hoverPink,
          border: `2px solid ${colors.ink}`,
          borderRadius: '18px',
          p: { xs: '20px', md: '32px' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: '16px', md: '20px 48px' },
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: { xs: 22, md: 28 }, letterSpacing: '-0.03em' }}>
            Email me this report
          </Typography>
          <Typography sx={{ fontSize: { xs: 15, md: 16 }, color: 'text.secondary', mt: '4px' }}>
            Keep a copy of your score, findings and fixes to come back to.
          </Typography>
        </Box>
        <Box>
          <Box
            component="form"
            onSubmit={submit}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: '8px',
              bgcolor: 'background.paper',
              border: `2px solid ${colors.ink}`,
              borderRadius: { xs: '20px', sm: '14px' },
              p: { xs: '10px 10px 10px 16px', sm: '8px 8px 8px 20px' },
            }}
          >
            <Box
              component="input"
              type="email"
              aria-label="Email address"
              placeholder="you@business.co.uk"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              sx={{
                flex: 1,
                minWidth: 0,
                border: 'none',
                outline: 'none',
                bgcolor: 'transparent',
                font: 'inherit',
                fontSize: { xs: 16, sm: 18 },
                color: 'text.primary',
                py: { xs: '6px', sm: '12px' },
                '&::placeholder': { color: colors.faint },
              }}
            />
            <Button
              type="submit"
              sx={{
                flex: 'none',
                borderRadius: '10px',
                px: { xs: '16px', md: '24px' },
                py: { xs: '10px', md: '15px' },
                fontFamily: ARCHIVO,
                fontWeight: 800,
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.2,
                textTransform: 'none',
                color: 'primary.contrastText',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: '#3A3733' },
              }}
            >
              Send it →
            </Button>
          </Box>
          {note && (
            <Typography role="status" sx={{ fontSize: 14, color: colors.muted, mt: '10px' }}>
              Your email app should open with a draft of your report — press send and it lands with Pete. Nothing is sent
              from this page itself.
            </Typography>
          )}
        </Box>
      </Box>
    </Reveal>
  );
}
