import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import {
  callFacts,
  contactEmail,
  sampleAvailableDays,
  sampleMonthLabel,
  sampleSlots,
} from '../data/content';
import { colors } from '../theme';
import Reveal from './Reveal';
import { Highlight, OutlineCta, PillButton, PinkDot, Portrait, PrimaryCta, TextArea, TextInput } from './ui';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// Sample month: October 2026 starts on a Thursday (prototype fixture, not live availability).
const FIRST_DAY_OFFSET = 3;
const DAYS_IN_MONTH = 31;

function dayLabel(day: number) {
  return `${WEEKDAYS[(FIRST_DAY_OFFSET + day - 1) % 7]} ${day} Oct`;
}

function to12h(slot: string) {
  const [h, m] = slot.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export default function Contact() {
  const [day, setDay] = useState<number | null>(8);
  const [slot, setSlot] = useState<string | null>(null);
  const [hour12, setHour12] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [message, setMessage] = useState('');
  const [emailNote, setEmailNote] = useState(false);

  const confirmHref = useMemo(() => {
    if (!day || !slot) return null;
    const subject = `Free intro call — ${dayLabel(day)} at ${slot}`;
    const body = `Hi Pete, the ${dayLabel(day)} at ${slot} slot suits me for a free 30-minute intro call.`;
    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [day, slot]);

  const emailHref = () => {
    const subject = 'Hello from your website';
    const lines = [
      `Name: ${name || '-'}`,
      `Email: ${email || '-'}`,
      `Business: ${business || '-'}`,
      '',
      message,
    ];
    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <Reveal
      id="contact"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '72px', md: '120px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '28px', md: '48px' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '18px', md: '20px' }, maxWidth: 720 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 40, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
          Let&apos;s sort your <Highlight>week</Highlight> out.
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: 1.6, color: colors.muted, maxWidth: 520 }}>
          A 30-minute chat about your business and where AI could help. There&apos;s no cost and no obligation.
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          border: `2px solid ${colors.ink}`,
          borderRadius: { xs: '16px', md: '20px' },
          boxShadow: `5px 5px 0 ${colors.ink}`,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 5fr) minmax(0, 6fr) minmax(0, 5fr)' },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            p: { xs: '20px', md: 'clamp(24px, 3vw, 40px)' },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '12px', md: '16px' },
            alignItems: 'flex-start',
            bgcolor: '#FBFAF8',
            borderBottom: { xs: `1px solid ${colors.borderLight}`, lg: 'none' },
          }}
        >
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Portrait size={64} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography sx={{ fontSize: { xs: 14, md: 15 }, fontWeight: { xs: 400, md: 600 }, color: { xs: colors.muted, md: 'text.primary' } }}>
              Pete
            </Typography>
            <Typography variant="h3" sx={{ fontSize: 26, letterSpacing: '-0.025em', lineHeight: 1.1 }}>Free intro call</Typography>
          </Box>
          <Typography sx={{ fontSize: 15, lineHeight: 1.6, color: colors.muted, display: { xs: 'none', md: 'block' } }}>
            A relaxed chat about your business, where your week goes, and whether AI can help.
          </Typography>
          {/* Mobile: facts as compact chips. Desktop: key/value rows. */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexWrap: 'wrap', gap: '6px' }}>
            {callFacts.map((fact) => (
              <Typography
                key={fact.key}
                component="span"
                sx={{ bgcolor: '#F1EFEA', borderRadius: 999, px: '12px', py: '6px', fontSize: 13 }}
              >
                {fact.value}
              </Typography>
            ))}
          </Box>
          <Box sx={{ width: '100%', mt: 'auto', display: { xs: 'none', md: 'block' } }}>
            {callFacts.map((fact) => (
              <Box
                key={fact.key}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  py: '12px',
                  borderTop: `1px solid ${colors.border}`,
                  fontSize: 14,
                }}
              >
                <Typography component="span" sx={{ fontSize: 14, color: colors.faint }}>{fact.key}</Typography>
                <Typography component="span" sx={{ fontSize: 14, fontWeight: 600 }}>{fact.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            p: { xs: '18px 16px', md: 'clamp(24px, 3vw, 40px)' },
            borderLeft: { lg: `1px solid ${colors.border}` },
            borderRight: { lg: `1px solid ${colors.border}` },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '14px', md: 0 },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 0, md: '20px' } }}>
            <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: { xs: 18, md: 20 }, letterSpacing: '-0.02em' }}>
              {sampleMonthLabel}
            </Typography>
            <Box sx={{ display: 'flex', gap: '8px' }}>
              {['‹', '›'].map((arrow, i) => (
                <Box
                  key={arrow}
                  component="button"
                  type="button"
                  disabled
                  title="Sample month — Pete confirms real availability by email"
                  aria-label={i === 0 ? 'Previous month (sample calendar)' : 'Next month (sample calendar)'}
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: { xs: `2px solid ${colors.ink}`, md: `1.5px solid ${colors.ink}` },
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    fontSize: 14,
                    opacity: 0.4,
                    cursor: 'default',
                  }}
                >
                  {arrow}
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: { xs: '3px', md: '4px' } }}>
            {WEEKDAYS.map((d) => (
              <Typography
                key={d}
                component="span"
                sx={{
                  textAlign: 'center',
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  color: colors.faint,
                  pb: { xs: '8px', md: '6px' },
                }}
              >
                {d}
              </Typography>
            ))}
            {Array.from({ length: FIRST_DAY_OFFSET }).map((_, i) => (
              <Box key={`pad-${i}`} />
            ))}
            {Array.from({ length: DAYS_IN_MONTH }).map((_, i) => {
              const d = i + 1;
              const available = sampleAvailableDays.includes(d);
              const selected = d === day;
              return (
                <Box
                  key={d}
                  component="button"
                  type="button"
                  disabled={!available}
                  aria-pressed={selected}
                  aria-label={available ? `${dayLabel(d)} — available` : `${dayLabel(d)} — unavailable`}
                  onClick={() => {
                    setDay(d);
                    setSlot(null);
                  }}
                  sx={{
                    cursor: available ? 'pointer' : 'default',
                    height: { xs: 40, md: 52 },
                    borderRadius: { xs: '10px', md: '12px' },
                    border: 'none',
                    bgcolor: selected ? 'secondary.main' : available ? '#F1EFEA' : 'transparent',
                    color: available ? 'text.primary' : colors.strike,
                    font: 'inherit',
                    fontSize: { xs: 14, md: 15 },
                    fontWeight: available ? 600 : 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: '2px', md: '3px' },
                    transition: 'background 0.2s',
                    '&:hover': available && !selected ? { bgcolor: colors.hoverPink } : {},
                  }}
                >
                  {d}
                  <Box
                    component="span"
                    aria-hidden
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: selected ? 'primary.main' : available ? '#B5AEA3' : 'transparent',
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            p: { xs: '18px 16px 20px', md: 'clamp(24px, 3vw, 40px)' },
            borderTop: { xs: `1px solid ${colors.borderLight}`, lg: 'none' },
            display: { xs: 'grid', md: 'flex' },
            gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'none' },
            flexDirection: 'column',
            gap: { xs: '8px', md: '10px' },
          }}
        >
          <Box
            sx={{
              gridColumn: '1 / -1',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: { xs: 0, md: '10px' },
              pb: { xs: '4px', md: 0 },
              gap: '12px',
            }}
          >
            <Typography aria-live="polite" sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 18 }}>
              {day ? dayLabel(day) : 'Pick a day'}
            </Typography>
            <Box
              role="group"
              aria-label="Time format"
              sx={{ display: 'inline-flex', bgcolor: colors.track, borderRadius: 999, p: '3px', gap: '2px' }}
            >
              {(['12h', '24h'] as const).map((fmt) => {
                const on = (fmt === '12h') === hour12;
                return (
                  <Box
                    key={fmt}
                    component="button"
                    type="button"
                    aria-pressed={on}
                    onClick={() => setHour12(fmt === '12h')}
                    sx={{
                      cursor: 'pointer',
                      border: 'none',
                      font: 'inherit',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: { xs: 600, md: 700 },
                      fontSize: { xs: 12, md: 11 },
                      px: '10px',
                      py: { xs: '5px', md: '4px' },
                      borderRadius: 999,
                      bgcolor: on ? 'primary.main' : 'transparent',
                      color: on ? 'primary.contrastText' : colors.muted,
                    }}
                  >
                    {fmt}
                  </Box>
                );
              })}
            </Box>
          </Box>
          {sampleSlots.map((s) => {
            const on = s === slot;
            return (
              <Box
                key={s}
                component="button"
                type="button"
                aria-pressed={on}
                onClick={() => setSlot(s)}
                sx={{
                  cursor: 'pointer',
                  py: { xs: '11px', md: '13px' },
                  borderRadius: { xs: '10px', md: '12px' },
                  border: `2px solid ${on ? colors.ink : colors.input}`,
                  bgcolor: on ? 'secondary.main' : 'background.paper',
                  color: 'text.primary',
                  font: 'inherit',
                  fontFamily: { xs: "'Archivo', sans-serif", md: 'inherit' },
                  fontSize: { xs: 14, md: 15 },
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: colors.ink },
                }}
              >
                {hour12 ? to12h(s) : s}
              </Box>
            );
          })}
          {confirmHref ? (
            <OutlineCta
              component="a"
              href={confirmHref}
              sx={{ gridColumn: '1 / -1', mt: { xs: '6px', md: 'auto' }, width: '100%', justifyContent: 'center' }}
            >
              <PinkDot />Confirm
            </OutlineCta>
          ) : (
            <OutlineCta
              component="button"
              disabled
              aria-disabled="true"
              sx={{
                gridColumn: '1 / -1',
                mt: { xs: '6px', md: 'auto' },
                width: '100%',
                justifyContent: 'center',
                opacity: 0.45,
                cursor: 'default',
              }}
            >
              <PinkDot />Confirm
            </OutlineCta>
          )}
        </Box>
      </Box>

      <Typography sx={{ fontSize: 14, color: colors.faint, maxWidth: 640 }}>
        Sample availability, not a live diary — Confirm opens an email with your pick and Pete locks the slot in
        with you personally.
      </Typography>

      <Box
        sx={{
          bgcolor: 'background.paper',
          border: `2px solid ${colors.ink}`,
          borderRadius: '16px',
          boxShadow: `5px 5px 0 ${colors.ink}`,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: { xs: '14px', md: '16px 32px' },
            p: { xs: '20px', md: 'clamp(24px, 3vw, 34px) clamp(24px, 3vw, 36px)' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '4px', md: '8px' } }}>
            <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 'clamp(22px, 2.2vw, 28px)' }, letterSpacing: { xs: '-0.035em', md: 'inherit' } }}>
              Not quite ready for a chat?
            </Typography>
            <Typography sx={{ fontSize: { xs: 15, md: 16 }, color: colors.muted }}>
              No worries. Drop a message and you&apos;ll get a reply within one working day.
            </Typography>
          </Box>
          <PillButton
            aria-expanded={emailOpen}
            aria-controls="email-instead"
            onClick={() => setEmailOpen((v) => !v)}
            sx={{
              justifyContent: 'center',
              py: { xs: '12px', md: '10px' },
              fontSize: { xs: 15, md: 14 },
              borderWidth: 2,
              bgcolor: emailOpen ? 'background.paper' : 'secondary.main',
            }}
          >
            {emailOpen ? 'Close' : 'Send an email instead'}
          </PillButton>
        </Box>
        <Collapse in={emailOpen}>
          <Box
            id="email-instead"
            component="form"
            sx={{
              borderTop: `2px solid ${colors.ink}`,
              p: { xs: '20px', md: 'clamp(24px, 3vw, 36px)' },
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: '12px', md: '14px' },
            }}
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              setEmailNote(true);
              window.location.href = emailHref();
            }}
          >
            <TextInput label="Your name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <TextInput label="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextInput
              label="Business name (optional)"
              placeholder="Business name (optional)"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            />
            <Box sx={{ gridColumn: { md: '1 / -1' } }}>
              <TextArea
                label="What can we help with?"
                placeholder="What can we help with?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
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
    </Reveal>
  );
}
