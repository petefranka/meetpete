import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { aiSeoAssistantNote, aiSeoChecks } from '../../../data/content';
import { colors } from '../../../theme';
import { ARCHIVO } from '../shared/aiSeoStyles';

const TOTAL_MS = 5000;
const CHECK_MS = 600;

type CheckStatus = 'done' | 'current' | 'pending';

const statusIconSx: Record<CheckStatus, Record<string, string>> = {
  done: { bgcolor: '#2F9E44', color: '#FFFFFF', border: `1.5px solid ${colors.ink}` },
  current: { bgcolor: colors.pink, border: `1.5px solid ${colors.ink}` },
  pending: { bgcolor: colors.white, border: `1.5px solid ${colors.border}` },
};

function StatusIcon({ status }: { status: CheckStatus }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        flex: 'none',
        width: 18,
        height: 18,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        ...statusIconSx[status],
      }}
    >
      {status === 'done' ? '✓' : ''}
    </Box>
  );
}

function getCheckStatus(index: number, currentIndex: number, finished: boolean): CheckStatus {
  if (finished || index < currentIndex) return 'done';
  if (index === currentIndex) return 'current';
  return 'pending';
}

/**
 * Simulated scan progress card. Advances the checks sequentially over ~5s with
 * the percentage easing 0→100, then calls onDone. Honours prefers-reduced-motion
 * by jumping straight to the results.
 */
export default function AiSeoProgress({ domain, onDone }: { domain: string; onDone: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  // Keep the latest onDone without re-running the timer effect.
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doneRef.current();
      return;
    }
    const started = Date.now();
    const id = window.setInterval(() => {
      const e = Date.now() - started;
      if (e >= TOTAL_MS) {
        window.clearInterval(id);
        setElapsed(TOTAL_MS);
        doneRef.current();
      } else {
        setElapsed(e);
      }
    }, 80);
    return () => window.clearInterval(id);
  }, []);

  const t = Math.min(1, elapsed / TOTAL_MS);
  const percent = Math.round((1 - (1 - t) * (1 - t)) * 100);
  const finished = elapsed >= TOTAL_MS;
  const currentIndex = Math.min(aiSeoChecks.length - 1, Math.floor(elapsed / CHECK_MS));

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: `2px solid ${colors.ink}`,
        borderRadius: '20px',
        boxShadow: `6px 6px 0 ${colors.ink}`,
        transform: 'rotate(1deg)',
        p: { xs: '22px', md: '28px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '12px', md: '14px' },
        width: '100%',
        maxWidth: 480,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Typography
          sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: 13, fontWeight: 600, color: colors.muted }}
        >
          <Box
            component="span"
            aria-hidden
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: 'secondary.main',
              border: `1.5px solid ${colors.ink}`,
              animation: 'pmPulse 1.2s ease-in-out infinite',
              '@keyframes pmPulse': {
                '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.5)', opacity: 0.55 },
              },
            }}
          />
          Scanning
        </Typography>
        <Typography
          component="span"
          sx={{
            bgcolor: 'secondary.main',
            border: `1.5px solid ${colors.ink}`,
            borderRadius: 999,
            px: '10px',
            py: '4px',
            fontFamily: ARCHIVO,
            fontWeight: 700,
            fontSize: 12,
            maxWidth: '55%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {domain}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: 72, lineHeight: 1, letterSpacing: '-0.04em' }}>
          {percent}
        </Typography>
        <Typography sx={{ color: colors.muted, fontWeight: 600, fontSize: 20 }}>%</Typography>
      </Box>

      <Box
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Scan progress"
        sx={{ height: 14, borderRadius: 999, border: `1.5px solid ${colors.ink}`, bgcolor: colors.track, overflow: 'hidden' }}
      >
        <Box sx={{ height: '100%', width: `${percent}%`, bgcolor: 'secondary.main', transition: 'width 0.1s linear' }} />
      </Box>

      <Typography aria-live="polite" sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: { xs: 16, md: 18 }, letterSpacing: '-0.02em' }}>
        {finished ? 'Finishing up' : aiSeoChecks[currentIndex]}…
      </Typography>

      <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
        {aiSeoChecks.map((label, i) => {
          const status = getCheckStatus(i, currentIndex, finished);
          return (
            <Box
              component="li"
              key={label}
              sx={{ display: 'flex', alignItems: 'center', gap: '10px', py: '8px', borderTop: `1px solid ${colors.borderLight}` }}
            >
              <StatusIcon status={status} />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: status === 'current' ? 700 : 500,
                  color: status === 'pending' ? colors.faint : 'text.primary',
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
        <Box
          component="li"
          sx={{ display: 'flex', alignItems: 'center', gap: '10px', py: '8px', borderTop: `1px solid ${colors.borderLight}` }}
        >
          <StatusIcon status="pending" />
          <Typography sx={{ fontSize: 14, color: colors.faint }}>{aiSeoAssistantNote}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
