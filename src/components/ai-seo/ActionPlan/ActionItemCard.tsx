import { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import type { ActionItem, Priority } from '../../../models';
import { colors } from '../../../theme';
import { ARCHIVO, MONO, priorityStyles, scrollToId } from '../shared/aiSeoStyles';

const bodyTextSx = { fontSize: { xs: 15, md: 16 }, lineHeight: 1.6, color: 'text.primary' } as const;

function ColumnLabel({ children }: { children: string }) {
  return (
    <Typography sx={{ fontWeight: 800, fontSize: { xs: 13, md: 14 }, color: colors.label, mb: '6px' }}>
      {children}
    </Typography>
  );
}

function BodyColumn({ label, children }: { label: string; children: string }) {
  return (
    <Box>
      <ColumnLabel>{label}</ColumnLabel>
      <Typography sx={bodyTextSx}>{children}</Typography>
    </Box>
  );
}

function PriorityPill({ priority }: { priority: Priority }) {
  return (
    <Typography
      component="span"
      sx={{
        flex: 'none',
        width: { xs: 'auto', md: 84 },
        minWidth: { xs: 72, md: 0 },
        textAlign: 'center',
        bgcolor: priorityStyles[priority].bg,
        color: 'text.primary',
        border: `1.5px solid ${colors.ink}`,
        borderRadius: 999,
        px: { xs: '12px', md: 0 },
        py: { xs: '5px', md: '4px' },
        fontFamily: ARCHIVO,
        fontWeight: 800,
        fontSize: { xs: 13, md: 12 },
      }}
    >
      {priority}
    </Typography>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error('Unable to copy action-plan code.', error);
    }
  };

  return (
    <Box sx={{ position: 'relative', bgcolor: 'primary.main', borderRadius: '10px', p: '20px' }}>
      <Box
        component="pre"
        sx={{ m: 0, pr: { xs: 0, sm: '80px' }, fontFamily: MONO, fontSize: 14, lineHeight: 1.6, color: '#FFC2E0', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
      >
        {code}
      </Box>
      <Button
        onClick={copy}
        aria-live="polite"
        sx={{ position: { xs: 'static', sm: 'absolute' }, top: 12, right: 12, mt: { xs: '10px', sm: 0 }, borderRadius: '8px', bgcolor: 'secondary.main', color: 'text.primary', border: `2px solid ${colors.ink}`, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 13, px: '12px', py: '6px', minWidth: 0, lineHeight: 1.2, '&:hover': { bgcolor: colors.hoverPink } }}
      >
        {copied ? 'Copied ✓' : 'Copy'}
      </Button>
    </Box>
  );
}

function LockedFixTeaser() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
      <ColumnLabel>How to fix it</ColumnLabel>
      <Typography sx={bodyTextSx}>Step-by-step fix, how to test it, and copy-paste code</Typography>
      <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button
          onClick={() => scrollToId('ready-to-fix')}
          sx={{ borderRadius: 999, px: '14px', py: '8px', fontSize: 13, color: 'text.primary', bgcolor: 'secondary.main', border: `2px solid ${colors.ink}`, '&:hover': { bgcolor: colors.hoverPink } }}
        >
          Unlock with Pro
        </Button>
        <Button
          component={Link}
          href="/#contact"
          sx={{ borderRadius: 999, px: '14px', py: '8px', fontSize: 13, color: 'text.primary', bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, '&:hover': { bgcolor: colors.hoverPink } }}
        >
          Fix it for me
        </Button>
      </Box>
    </Box>
  );
}

interface ActionItemCardProps {
  item: ActionItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}

export default function ActionItemCard({ item, index, open, onToggle }: ActionItemCardProps) {
  const passing = item.priority === 'Passing';

  return (
    <Box sx={{ bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: '14px', overflow: 'hidden', boxShadow: open ? `5px 5px 0 ${colors.ink}` : 'none', transition: 'box-shadow 0.2s' }}>
      <Button
        fullWidth
        aria-expanded={open}
        aria-controls={`action-body-${index}`}
        id={`action-header-${index}`}
        onClick={onToggle}
        sx={{ display: 'flex', alignItems: 'center', gap: { xs: '14px', md: '18px' }, textAlign: 'left', px: { xs: '16px', md: '24px' }, py: { xs: '17px', md: '20px' }, borderRadius: 0, color: 'text.primary', fontWeight: 400, textTransform: 'none', '&:hover': { bgcolor: colors.bg } }}
      >
        <PriorityPill priority={item.priority} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: { xs: 19, md: 22 }, letterSpacing: { xs: '-0.38px', md: '-0.02em' }, lineHeight: { xs: '22.8px', md: 1.25 }, whiteSpace: 'normal' }}>
            {item.headline}
          </Typography>
          <Typography sx={{ fontSize: 14, lineHeight: { xs: '21px', md: 1.4 }, color: { xs: '#4A4640', md: colors.label }, whiteSpace: 'normal' }}>
            {item.cat} · {item.tech}
          </Typography>
        </Box>
        <Box component="span" aria-hidden sx={{ flex: 'none', width: 32, height: 32, borderRadius: '50%', border: `2px solid ${colors.ink}`, bgcolor: open ? 'secondary.main' : 'background.paper', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: 16, md: 18 }, fontWeight: 700, lineHeight: 1 }}>
          {open ? '−' : '+'}
        </Box>
      </Button>
      <Collapse in={open}>
        <Box
          id={`action-body-${index}`}
          role="region"
          aria-labelledby={`action-header-${index}`}
          sx={{ borderTop: `1px solid ${colors.border}`, p: { xs: '16px 14px', md: '24px' }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: { xs: '18px', md: '24px 32px' } }}
        >
          <BodyColumn label="What this means">{item.mean}</BodyColumn>
          <BodyColumn label="Why it matters">{item.why}</BodyColumn>
          {item.fix ? (
            <Box sx={{ gridColumn: { md: '1 / -1' } }}>
              <ColumnLabel>How to fix it</ColumnLabel>
              <Typography sx={bodyTextSx}>{item.fix}</Typography>
              {item.code && <Box sx={{ mt: '14px' }}><CodeBlock code={item.code} /></Box>}
            </Box>
          ) : (
            !passing && <Box sx={{ gridColumn: { md: '1 / -1' } }}><LockedFixTeaser /></Box>
          )}
          {item.test && (
            <Box sx={{ gridColumn: { md: '1' } }}>
              <ColumnLabel>How to test it</ColumnLabel>
              <Typography sx={bodyTextSx}>{item.test}</Typography>
            </Box>
          )}
          <Box sx={{ gridColumn: { md: item.test ? '2' : '1' } }}>
            <ColumnLabel>Source</ColumnLabel>
            <Typography component="span" sx={{ fontSize: { xs: 15, md: 16 }, fontWeight: 600, borderBottom: `1px solid ${colors.ink}` }}>
              {item.srcName} ↗
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
