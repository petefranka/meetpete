import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  contactEmail,
  sampleAvailableDays,
  sampleMonthLabel,
  sampleSlots,
} from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight, OutlineCta, PinkDot } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import { createMailtoHref } from '../../common/createMailtoHref';
import EmailAlternative from './EmailAlternative';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// Sample month: October 2026 starts on a Thursday (prototype fixture, not live availability).
const FIRST_DAY_OFFSET = 3;
const DAYS_IN_MONTH = 31;

function dayLabel(day: number) {
  return `${WEEKDAYS[(FIRST_DAY_OFFSET + day - 1) % 7]} ${day} Oct`;
}

export default function Contact() {
  const [day, setDay] = useState<number | null>(8);
  const [slot, setSlot] = useState<string | null>(null);

  const confirmHref = useMemo(() => {
    if (!day || !slot) return null;
    const subject = `Free intro call — ${dayLabel(day)} at ${slot}`;
    const body = `Hi Pete, the ${dayLabel(day)} at ${slot} slot suits me for a free 30-minute intro call.`;
    return createMailtoHref({ to: contactEmail, subject, body });
  }, [day, slot]);

  return (
    <Reveal
      id="contact"
      testId="home-contact"
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
          Let&apos;s get you <Highlight>found.</Highlight>
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: 1.6, color: colors.muted, maxWidth: 520 }}>
          A 30-minute chat about your business, your website and how customers find you. There&apos;s no cost and no obligation.
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          border: `2px solid ${colors.ink}`,
          borderRadius: { xs: '16px', md: '20px' },
          boxShadow: `5px 5px 0 ${colors.ink}`,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 7fr) minmax(0, 5fr)' },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            p: { xs: '18px 16px', md: 'clamp(24px, 3vw, 40px)' },
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
              let backgroundColor = 'transparent';
              let dotColor = 'transparent';

              if (selected) {
                backgroundColor = 'secondary.main';
                dotColor = 'primary.main';
              } else if (available) {
                backgroundColor = '#F1EFEA';
                dotColor = '#B5AEA3';
              }

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
                    bgcolor: backgroundColor,
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
                      bgcolor: dotColor,
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
                {s}
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

      <EmailAlternative />
    </Reveal>
  );
}
