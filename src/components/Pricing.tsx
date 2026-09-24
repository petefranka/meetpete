import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { contactEmail, mixItems, mixTeams, plans, type Plan } from '../data/content';
import { colors } from '../theme';
import Reveal from './Reveal';
import { Highlight, OutlineCta, PillButton, PinkDot, PrimaryCta, TextArea, TextInput } from './ui';

function planPrices(monthly: number, yearly: boolean) {
  if (!yearly) return { perMonth: monthly, note: 'Billed monthly, cancel any time' };
  const total = monthly * 10;
  return {
    perMonth: Math.round(total / 12),
    note: `£${total.toLocaleString('en-GB')} billed yearly`,
  };
}

function PlanCard({ plan, yearly, showPrices }: { plan: Plan; yearly: boolean; showPrices: boolean }) {
  const price = planPrices(plan.monthly, yearly);
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: plan.hero ? 'secondary.main' : 'background.paper',
        border: `2px solid ${colors.ink}`,
        borderRadius: '16px',
        boxShadow: `6px 6px 0 ${colors.ink}`,
        p: '34px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}
    >
      {plan.hero && (
        <Typography
          component="span"
          sx={{
            position: 'absolute',
            top: -19,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: 'background.paper',
            border: `2px solid ${colors.ink}`,
            borderRadius: 999,
            boxShadow: `3px 3px 0 ${colors.ink}`,
            px: '14px',
            py: '6px',
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            whiteSpace: 'nowrap',
          }}
        >
          Most popular
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: 48, md: 'clamp(48px, 5vw, 64px)' }, fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 0.85 }}
        >
          {plan.name}
        </Typography>
        <Typography sx={{ fontSize: 16, lineHeight: 1.5, color: plan.hero ? 'rgba(26,25,24,0.78)' : colors.muted, minHeight: '4.5em' }}>
          {plan.desc}
        </Typography>
      </Box>
      {showPrices && (
        <Box>
          <Typography component="span" sx={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px' }}>
            <Box
              component="span"
              sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: { xs: 40, md: 'clamp(40px, 4vw, 52px)' }, letterSpacing: '-0.05em', lineHeight: 1 }}
            >
              £{price.perMonth}
            </Box>
            <Box component="span" sx={{ fontSize: 15, color: plan.hero ? 'rgba(26,25,24,0.7)' : colors.muted }}>
              /month
            </Box>
          </Typography>
          <Typography sx={{ fontSize: 13, color: plan.hero ? 'rgba(26,25,24,0.7)' : colors.faint, mt: '2px' }}>
            {price.note}
          </Typography>
        </Box>
      )}
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column' }}>
        {plan.items.map((item) => (
          <Box
            component="li"
            key={item}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '12px',
              py: '12px',
              borderTop: `1px solid ${plan.hero ? 'rgba(26,25,24,0.22)' : colors.border}`,
              fontSize: 15,
              lineHeight: 1.45,
            }}
          >
            {item}
            <Box component="span" aria-hidden sx={{ color: plan.hero ? 'rgba(26,25,24,0.55)' : colors.faint }}>
              +
            </Box>
          </Box>
        ))}
      </Box>
      <OutlineCta component="a" href="#contact" sx={{ mt: 'auto', width: '100%', justifyContent: 'center' }}>
        <PinkDot />Talk about&nbsp;{plan.name}
      </OutlineCta>
    </Box>
  );
}

export default function Pricing() {
  const [showPrices, setShowPrices] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [mixerOpen, setMixerOpen] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [team, setTeam] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [notes, setNotes] = useState('');
  const [quoteNote, setQuoteNote] = useState(false);
  // Mobile shows one plan at a time; the prototype opens on Raspberry.
  const [planIndex, setPlanIndex] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const estimate = useMemo(() => {
    const base = picked.reduce((sum, label) => sum + (mixItems.find((m) => m.label === label)?.monthly ?? 0), 0);
    return Math.round((base * mixTeams[team].multiplier) / 5) * 5;
  }, [picked, team]);

  const rescuePicked = picked.includes('Vibe-Code Rescue');

  const togglePicked = (label: string) =>
    setPicked((cur) => (cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label]));

  const quoteHref = () => {
    const subject = 'Quote request — mix my own flavour';
    const lines = [
      `Name: ${name || '-'}`,
      `Email: ${email || '-'}`,
      `Business: ${business || '-'}`,
      '',
      `Mix: ${picked.length ? picked.join(', ') : 'Nothing picked yet'}`,
      `Team size: ${mixTeams[team].label}`,
      `Rough estimate: £${estimate}/month`,
      '',
      notes,
    ];
    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <Reveal
      id="pricing"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '56px', md: '120px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '28px', md: '48px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: { xs: '14px 48px', md: '24px 48px' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '18px', md: '20px' }, maxWidth: 640 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' } }}>
            Pick your <Highlight>flavour.</Highlight>
          </Typography>
          <Typography sx={{ fontSize: { xs: 17, md: 18 }, lineHeight: 1.6, color: colors.muted, maxWidth: 460 }}>
            Every plan starts with an AI Health Check, so you only pay for what actually helps.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {showPrices && (
            <Box
              role="group"
              aria-label="Billing period"
              sx={{ display: 'inline-flex', bgcolor: colors.track, borderRadius: 999, p: '4px', gap: '2px' }}
            >
              <Box
                component="button"
                type="button"
                aria-pressed={!yearly}
                onClick={() => setYearly(false)}
                sx={{
                  cursor: 'pointer',
                  border: 'none',
                  font: 'inherit',
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  px: '16px',
                  py: '8px',
                  borderRadius: 999,
                  bgcolor: !yearly ? 'primary.main' : 'transparent',
                  color: !yearly ? 'primary.contrastText' : colors.muted,
                }}
              >
                Monthly
              </Box>
              <Box
                component="button"
                type="button"
                aria-pressed={yearly}
                onClick={() => setYearly(true)}
                sx={{
                  cursor: 'pointer',
                  border: 'none',
                  font: 'inherit',
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  px: '16px',
                  py: '8px',
                  borderRadius: 999,
                  bgcolor: yearly ? 'primary.main' : 'transparent',
                  color: yearly ? 'primary.contrastText' : colors.muted,
                }}
              >
                Yearly · 2 months free
              </Box>
            </Box>
          )}
          <PillButton
            aria-expanded={showPrices}
            onClick={() => setShowPrices((v) => !v)}
            sx={{ bgcolor: 'background.paper' }}
          >
            {showPrices ? 'Hide prices' : 'See prices →'}
          </PillButton>
        </Box>
      </Box>

      {isMobile ? (
        <>
          {/* Mobile: one plan at a time, switched by the tab bar. */}
          <Box
            role="tablist"
            aria-label="Plans"
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              bgcolor: 'background.paper',
              border: `2px solid ${colors.ink}`,
              borderRadius: '14px',
              p: '5px',
            }}
          >
            {plans.map((plan, i) => {
              const on = i === planIndex;
              return (
                <Box
                  key={plan.id}
                  component="button"
                  type="button"
                  role="tab"
                  id={`plan-tab-${plan.id}`}
                  aria-selected={on}
                  aria-controls={`plan-panel-${plan.id}`}
                  onClick={() => setPlanIndex(i)}
                  sx={{
                    cursor: 'pointer',
                    border: 'none',
                    font: 'inherit',
                    textAlign: 'center',
                    py: '12px',
                    borderRadius: '10px',
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    fontSize: 15,
                    bgcolor: on ? colors.border : 'transparent',
                    color: on ? 'text.primary' : colors.muted,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {plan.name}
                </Box>
              );
            })}
          </Box>
          <Box sx={{ pt: '24px' }}>
            {plans.map((plan, i) => (
              <Box
                key={plan.id}
                role="tabpanel"
                id={`plan-panel-${plan.id}`}
                aria-labelledby={`plan-tab-${plan.id}`}
                hidden={i !== planIndex}
                sx={i === planIndex ? {} : { display: 'none' }}
              >
                <PlanCard plan={plan} yearly={yearly} showPrices={showPrices} />
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '18px',
            pt: '24px',
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} yearly={yearly} showPrices={showPrices} />
          ))}
        </Box>
      )}

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
            <Typography variant="h3" sx={{ fontSize: { xs: 24, md: 'clamp(24px, 2.4vw, 34px)' }, lineHeight: { xs: 1.15, md: 'inherit' } }}>
              None of these quite right? Make your own <Highlight>flavour.</Highlight>
            </Typography>
            <Typography sx={{ fontSize: { xs: 15, md: 16 }, color: colors.muted }}>
              Mix and match the bits you need and get a rough quote in seconds.
            </Typography>
          </Box>
          <PillButton
            aria-expanded={mixerOpen}
            aria-controls="mix-my-own"
            onClick={() => setMixerOpen((v) => !v)}
            sx={{ bgcolor: mixerOpen ? 'background.paper' : 'secondary.main', borderWidth: 2, justifyContent: 'center' }}
          >
            {mixerOpen ? 'Close the mixer' : 'Mix my own →'}
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
                gap: { xs: '22px', md: '24px' },
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 15, mb: '10px' }}>
                  1. What do you need?
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: '8px', md: '10px' } }}>
                  {mixItems.map((item) => {
                    const on = picked.includes(item.label);
                    return (
                      <Box
                        key={item.label}
                        component="button"
                        type="button"
                        aria-pressed={on}
                        onClick={() => togglePicked(item.label)}
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
                          boxShadow: on ? `3px 3px 0 ${colors.ink}` : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        <Box component="span" aria-hidden>{on ? '✓' : '+'}</Box>
                        {item.label}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box>
                <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 15, mb: '10px' }}>
                  2. How big is your business?
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: '8px', md: '10px' } }}>
                  {mixTeams.map((t, i) => {
                    const on = i === team;
                    return (
                      <Box
                        key={t.label}
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
                          borderRadius: { xs: '12px', md: 999 },
                          border: `2px solid ${on ? colors.ink : colors.border}`,
                          bgcolor: on ? 'secondary.main' : 'background.paper',
                          boxShadow: on ? `3px 3px 0 ${colors.ink}` : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        {t.label}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box sx={{ mt: 'auto', bgcolor: 'background.default', borderRadius: '14px', p: { xs: '18px', md: '20px' }, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: { xs: 700, md: 600 }, fontSize: { xs: 13, md: 11 }, color: { xs: colors.muted, md: colors.faint } }}>
                  Your rough estimate
                </Typography>
                <Typography component="span" sx={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px' }}>
                  <Box
                    component="span"
                    aria-live="polite"
                    sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: { xs: 36, md: 44 }, letterSpacing: { xs: '-0.05em', md: '-0.03em' }, lineHeight: 1 }}
                  >
                    £{estimate}
                  </Box>
                  <Box component="span" sx={{ fontSize: 15, color: colors.muted }}>/month</Box>
                </Typography>
                <Typography sx={{ fontSize: { xs: 14, md: 13 }, color: { xs: colors.body, md: colors.muted } }}>
                  Plus a one-off AI Health Check{rescuePicked ? ', and Vibe-Code Rescue from £1,500' : ''}.
                </Typography>
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
              <TextInput
                label="Business name (optional)"
                placeholder="Business name (optional)"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
              <TextArea
                label="Anything else?"
                placeholder="Anything else? Tell us about your business, your tools, or what's driving you mad."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <PrimaryCta type="submit" sx={{ width: '100%', justifyContent: 'center' }}>
                Send my quote request →
              </PrimaryCta>
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

      <Typography sx={{ fontSize: 15, color: colors.muted }}>
        Not sure? Most start on Raspberry. Vibe-Code Rescue is quoted per project.
      </Typography>
    </Reveal>
  );
}
