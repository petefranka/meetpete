import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  aiAnswer,
  aiClosing,
  aiQuestion,
  auditBars,
  chatDemo,
  codeRows,
  contentPost,
  flowSteps,
  inboxRows,
  logRows,
  services,
  weekDays,
  type Service,
} from '../data/content';
import { colors } from '../theme';
import Reveal from './Reveal';
import { Highlight, OutlineCta, PinkDot } from './ui';

function AuditDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2 }}>
        <Typography sx={{ fontSize: 15, color: colors.muted }}>Hours found per week</Typography>
        <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: { xs: 34, md: 40 }, letterSpacing: '-0.03em' }}>
          7.5
        </Typography>
      </Box>
      {auditBars.map((bar) => (
        <Box
          key={bar.label}
          sx={{ display: 'grid', gridTemplateColumns: { xs: '110px 1fr 44px', md: '100px 1fr auto' }, alignItems: 'center', gap: { xs: '12px', md: '14px' } }}
        >
          <Typography sx={{ fontSize: 14, color: colors.body }}>{bar.label}</Typography>
          <Box sx={{ height: 10, bgcolor: colors.border, borderRadius: '2px', overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: bar.width, bgcolor: 'primary.main' }} />
          </Box>
          <Typography sx={{ fontFamily: { xs: "'Archivo', sans-serif", md: 'inherit' }, fontSize: { xs: 12, md: 13 }, fontWeight: 600, minWidth: 30, textAlign: 'right' }}>{bar.hours}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function ChatDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {chatDemo.map((msg) => (
        <Box
          key={msg.text}
          sx={{
            alignSelf: msg.from === 'customer' ? 'flex-start' : 'flex-end',
            maxWidth: '86%',
            bgcolor: msg.from === 'customer' ? 'background.paper' : 'primary.main',
            color: msg.from === 'customer' ? 'text.primary' : 'primary.contrastText',
            borderRadius: msg.from === 'customer' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
            px: '16px',
            py: '12px',
            fontSize: 15,
            lineHeight: 1.45,
          }}
        >
          {msg.text}
        </Box>
      ))}
    </Box>
  );
}

function FlowDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      {flowSteps.map((step, i) => (
        <Box key={step.key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              bgcolor: 'background.paper',
              borderRadius: '4px',
              px: '16px',
              py: '12px',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                opacity: 0.6,
                width: 64,
                flex: 'none',
              }}
            >
              {step.key}
            </Typography>
            <Typography component="span" sx={{ fontSize: 15 }}>
              {step.text}
            </Typography>
          </Box>
          {i < flowSteps.length - 1 && (
            <Box aria-hidden sx={{ width: 1, height: 14, bgcolor: '#BDB7AD' }} />
          )}
        </Box>
      ))}
    </Box>
  );
}

function ContentDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '120px 1fr' }, gap: { xs: '14px', md: '16px' }, alignItems: 'start' }}>
        <Box
          aria-hidden
          sx={{
            aspectRatio: { xs: '16 / 10', md: '1 / 1' },
            width: '100%',
            borderRadius: '10px',
            background: `repeating-linear-gradient(135deg, ${colors.border} 0 8px, ${colors.track} 8px 16px)`,
            display: 'flex',
            alignItems: 'flex-end',
            p: '8px',
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 600,
            fontSize: 9,
            color: '#8C857B',
          }}
        >
          Your photo
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography component="span" sx={{ fontSize: 14, lineHeight: 1.45 }}>
            {contentPost}
          </Typography>
          <Box sx={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {weekDays.map((d, i) => (
              <Box
                key={i}
                component="span"
                sx={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 600,
                  fontSize: 10,
                  px: '7px',
                  py: '5px',
                  borderRadius: '3px',
                  bgcolor: d.active ? 'primary.main' : colors.border,
                  color: d.active ? 'primary.contrastText' : colors.muted,
                }}
              >
                {d.day}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: 11, color: colors.muted }}>
        3 Posts scheduled this week
      </Typography>
    </Box>
  );
}

function InboxDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {inboxRows.map((row) => (
        <Box
          key={row.who}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '12px',
            alignItems: 'center',
            py: '11px',
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{row.who}</Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: colors.muted,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {row.text}
            </Typography>
          </Box>
          <Box
            component="span"
            sx={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 600,
              fontSize: 10,
              px: '8px',
              py: '4px',
              borderRadius: 999,
              bgcolor: row.highlight ? 'primary.main' : colors.border,
              color: row.highlight ? 'primary.contrastText' : 'text.primary',
              whiteSpace: 'nowrap',
            }}
          >
            {row.status}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function CodeDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {codeRows.map((row) => (
        <Box
          key={row.text}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '12px',
            alignItems: 'center',
            py: '10px',
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: colors.muted,
              textDecoration: 'line-through',
              textDecorationColor: colors.strike,
            }}
          >
            {row.text}
          </Typography>
          <Box
            component="span"
            sx={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              px: '10px',
              py: '4px',
              borderRadius: 999,
              bgcolor: 'secondary.main',
              border: `1.5px solid ${colors.ink}`,
              whiteSpace: 'nowrap',
            }}
          >
            {row.status}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function AiDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Box
        sx={{
          alignSelf: 'flex-end',
          maxWidth: '86%',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: '16px 16px 4px 16px',
          px: '16px',
          py: '12px',
          fontSize: 15,
        }}
      >
        {aiQuestion}
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <Box
          aria-hidden
          sx={{
            flex: 'none',
            width: 28,
            height: 28,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            border: `1.5px solid ${colors.ink}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
          }}
        >
          ✦
        </Box>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '16px 16px 16px 4px',
            px: '16px',
            py: '12px',
            fontSize: 15,
            lineHeight: 1.5,
          }}
        >
          <Box component="span" sx={{ bgcolor: 'secondary.main', px: '4px', fontWeight: 700 }}>
            {aiAnswer.highlight}
          </Box>
          {aiAnswer.rest}
        </Box>
      </Box>
      <Typography
        sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 12, color: colors.muted }}
      >
        {aiClosing}
      </Typography>
    </Box>
  );
}

function LogDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {logRows.map((row) => (
        <Box
          key={row.month}
          sx={{
            display: 'grid',
            gridTemplateColumns: '56px 14px 1fr',
            gap: '10px',
            alignItems: 'center',
            py: '9px',
          }}
        >
          <Typography
            component="span"
            sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: 11, color: colors.muted }}
          >
            {row.month}
          </Typography>
          <Box
            aria-hidden
            sx={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              bgcolor: row.fresh ? 'primary.main' : colors.faint,
            }}
          />
          <Typography component="span" sx={{ fontSize: 14 }}>
            {row.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function ServiceDemo({ service }: { service: Service }) {
  switch (service.demo) {
    case 'audit':
      return <AuditDemo />;
    case 'chat':
      return <ChatDemo />;
    case 'flow':
      return <FlowDemo />;
    case 'content':
      return <ContentDemo />;
    case 'inbox':
      return <InboxDemo />;
    case 'code':
      return <CodeDemo />;
    case 'ai':
      return <AiDemo />;
    case 'log':
      return <LogDemo />;
  }
}

/** Row in the services picker. Accordion header on mobile, list option on desktop. */
function ServiceRow({
  service,
  index,
  on,
  variant,
  onPick,
}: {
  service: Service;
  index: number;
  on: boolean;
  variant: 'accordion' | 'list';
  onPick: () => void;
}) {
  const accordion = variant === 'accordion';
  return (
    <Box
      component="button"
      type="button"
      id={`service-button-${service.id}`}
      {...(accordion
        ? { 'aria-expanded': on, 'aria-controls': `service-panel-${service.id}` }
        : { role: 'listitem', 'aria-pressed': on })}
      onClick={onPick}
      sx={{
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        mb: '6px',
        py: '24px',
        px: '20px',
        pl: on ? { xs: '28px', md: '32px' } : '20px',
        font: 'inherit',
        textAlign: 'left',
        color: 'text.primary',
        bgcolor: on ? 'secondary.main' : 'transparent',
        border: `2px solid ${on ? colors.ink : 'transparent'}`,
        borderBottom: accordion
          ? `2px solid ${on ? colors.ink : 'transparent'}`
          : on
            ? `2px solid ${colors.ink}`
            : `1px solid ${colors.border}`,
        borderRadius: on ? '12px' : 0,
        boxShadow: on ? `4px 4px 0 ${colors.ink}` : 'none',
        transition: 'background 0.25s, color 0.25s, padding 0.25s, border-color 0.25s',
        '&:hover': { bgcolor: on ? 'secondary.main' : 'rgba(26,25,24,0.03)' },
      }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(34px, 3.4vw, 46px)',
          letterSpacing: { xs: '-0.05em', md: '-0.03em' },
          lineHeight: 1,
          width: { xs: 64, md: 'auto' },
          flex: { xs: 'none', md: '0 1 auto' },
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </Typography>
      <Typography
        component="span"
        sx={{
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(22px, 2.2vw, 30px)',
          letterSpacing: { xs: '-0.03em', md: '-0.02em' },
          flex: 1,
        }}
      >
        {service.title}
      </Typography>
      <Box component="span" aria-hidden sx={{ fontSize: 20, opacity: on ? 1 : accordion ? 0.5 : 0.25 }}>
        {accordion ? (on ? '−' : '+') : '→'}
      </Box>
    </Box>
  );
}

/** Body, demo panel and CTA for the selected service — shared by both presentations. */
function ServiceDetailContent({ service }: { service: Service }) {
  return (
    <>
      <Typography sx={{ fontSize: 17, lineHeight: 1.6, color: colors.body, textWrap: 'pretty' }}>
        {service.body}
      </Typography>
      <Box
        sx={{
          mt: 'auto',
          bgcolor: 'background.default',
          borderRadius: '14px',
          p: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '12px', md: '18px' },
          minHeight: { md: 300 },
        }}
      >
        <Typography
          component="span"
          sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 600, fontSize: 11, color: colors.faint }}
        >
          What it looks like
        </Typography>
        <ServiceDemo service={service} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            mt: 'auto',
            flexWrap: 'wrap',
          }}
        >
          <Typography sx={{ fontSize: 15, color: colors.muted }}>{service.saves}</Typography>
          <OutlineCta component="a" href="#contact">
            <PinkDot />Talk about this
          </OutlineCta>
        </Box>
      </Box>
    </>
  );
}

export default function Services() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((s) => s.id === activeId) ?? services[0];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Reveal
      id="services"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '56px', md: '120px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '28px', md: '56px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '24px 48px',
        }}
      >
        <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 'clamp(36px, 4.4vw, 60px)' }, maxWidth: 660, textWrap: 'balance' }}>
          Eight ways to get your <Highlight>evenings</Highlight> back.
        </Typography>
        <Typography sx={{ fontSize: { xs: 17, md: 18 }, lineHeight: 1.6, color: colors.muted, maxWidth: 380 }}>
          Pick one to see what it looks like in practice.
        </Typography>
      </Box>
      {isMobile ? (
        // Mobile: accordion — the selected service expands its detail card inline.
        <Box sx={{ borderTop: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column' }}>
          {services.map((service, i) => {
            const on = service.id === activeId;
            return (
              <Fragment key={service.id}>
                <ServiceRow
                  service={service}
                  index={i}
                  on={on}
                  variant="accordion"
                  onPick={() => {
                    if (!on) setActiveId(service.id);
                  }}
                />
                {on && (
                  <Box sx={{ p: '14px 0 20px' }}>
                    <Box
                      key={service.id}
                      id={`service-panel-${service.id}`}
                      role="region"
                      aria-labelledby={`service-button-${service.id}`}
                      className="panel-swap"
                      sx={{
                        bgcolor: 'background.paper',
                        border: `2px solid ${colors.ink}`,
                        borderRadius: '16px',
                        boxShadow: `5px 5px 0 ${colors.ink}`,
                        p: '28px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px',
                      }}
                    >
                      <ServiceDetailContent service={service} />
                    </Box>
                  </Box>
                )}
              </Fragment>
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: '56px',
            alignItems: 'start',
          }}
        >
          <Box
            role="list"
            aria-label="Services"
            sx={{ borderTop: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column' }}
          >
            {services.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={i}
                on={service.id === activeId}
                variant="list"
                onPick={() => setActiveId(service.id)}
              />
            ))}
          </Box>
          <Box
            aria-live="polite"
            sx={{
              position: 'sticky',
              top: 100,
              bgcolor: 'background.paper',
              border: `2px solid ${colors.ink}`,
              borderRadius: '16px',
              boxShadow: `5px 5px 0 ${colors.ink}`,
              p: 'clamp(28px, 3.5vw, 44px)',
              minHeight: 520,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box key={active.id} className="panel-swap" sx={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              <Typography variant="h3" sx={{ fontSize: 'clamp(28px, 2.8vw, 38px)' }}>
                {active.title}
              </Typography>
              <ServiceDetailContent service={active} />
            </Box>
          </Box>
        </Box>
      )}
    </Reveal>
  );
}
