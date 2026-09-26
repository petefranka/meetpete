import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { contactEmail } from '../../../data/content';
import { colors } from '../../../theme';
import { PillButton, PrimaryCta, TextArea, TextInput } from '../../common/BrandPrimitives/BrandPrimitives';
import { createMailtoHref } from '../../common/createMailtoHref';

export default function EmailAlternative() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [message, setMessage] = useState('');
  const [emailNote, setEmailNote] = useState(false);

  const emailHref = () => {
    const subject = 'Hello from your website';
    const lines = [
      `Name: ${name || '-'}`,
      `Email: ${email || '-'}`,
      `Business: ${business || '-'}`,
      '',
      message,
    ];
    return createMailtoHref({ to: contactEmail, subject, body: lines.join('\n') });
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: '16px', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, gap: { xs: '14px', md: '16px 32px' }, p: { xs: '20px', md: 'clamp(24px, 3vw, 34px) clamp(24px, 3vw, 36px)' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '4px', md: '8px' } }}>
          <Typography variant="h3" sx={{ fontSize: { xs: 21, md: 'clamp(22px, 2.2vw, 28px)' }, letterSpacing: { xs: '-0.035em', md: 'inherit' } }}>
            Not quite ready for a chat?
          </Typography>
          <Typography sx={{ fontSize: { xs: 15, md: 16 }, color: colors.muted }}>
            <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
              No worries. Drop a message and you&apos;ll get a reply within one working day.
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>
              Drop a message instead. Reply within a working day.
            </Box>
          </Typography>
        </Box>
        <PillButton
          aria-expanded={open}
          aria-controls="email-instead"
          onClick={() => setOpen((value) => !value)}
          sx={{ justifyContent: 'center', py: { xs: '12px', md: '10px' }, fontSize: { xs: 15, md: 14 }, borderWidth: 2, bgcolor: open ? 'background.paper' : 'secondary.main' }}
        >
          {open ? 'Close' : 'Send an email instead'}
        </PillButton>
      </Box>
      <Collapse in={open}>
        <Box
          id="email-instead"
          component="form"
          sx={{ borderTop: `2px solid ${colors.ink}`, p: { xs: '20px', md: 'clamp(24px, 3vw, 36px)' }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: '12px', md: '14px' } }}
          onSubmit={(event: React.FormEvent) => {
            event.preventDefault();
            setEmailNote(true);
            window.location.href = emailHref();
          }}
        >
          <TextInput label="Your name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} />
          <TextInput label="Email" type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <TextInput label="Business name (optional)" placeholder="Business name (optional)" value={business} onChange={(event) => setBusiness(event.target.value)} />
          <Box sx={{ gridColumn: { md: '1 / -1' } }}>
            <TextArea label="What can we help with?" placeholder="What can we help with?" value={message} onChange={(event) => setMessage(event.target.value)} />
          </Box>
          <Box sx={{ gridColumn: { md: '1 / -1' }, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <PrimaryCta type="submit" sx={{ alignSelf: 'flex-start' }}>
              Send message →
            </PrimaryCta>
            {emailNote && (
              <Typography role="status" sx={{ fontSize: 14, color: colors.muted }}>
                Your email app should open with your message filled in — press send and it lands with Pete.
                Nothing is sent from this page itself.
              </Typography>
            )}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
