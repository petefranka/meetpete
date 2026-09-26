import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { colors } from '../../../theme';
import { ARCHIVO, scrollToId } from '../shared/aiSeoStyles';

export type ResultsTab = 'overview' | 'ai' | 'fixes';

const TAB_LABELS: [ResultsTab, string][] = [
  ['overview', 'Overview'],
  ['ai', 'AI answers'],
  ['fixes', 'Fixes'],
];

export const tabSx = (active: ResultsTab, tab: ResultsTab, shownDisplay = 'block') =>
  ({ display: { xs: active === tab ? shownDisplay : 'none', md: shownDisplay } }) as const;

export function MobileResultsTabs({
  tab,
  onChange,
}: {
  tab: ResultsTab;
  onChange: (tab: ResultsTab) => void;
}) {
  return (
    <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'sticky', top: 72, zIndex: 20, px: '20px', pt: '10px' }}>
      <Box
        component="nav"
        aria-label="Report sections"
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: 999, p: '4px' }}
      >
        {TAB_LABELS.map(([id, label]) => {
          const active = tab === id;
          return (
            <Button
              key={id}
              aria-pressed={active}
              onClick={() => onChange(id)}
              sx={{
                borderRadius: 999,
                py: '9px',
                minWidth: 0,
                fontFamily: ARCHIVO,
                fontWeight: 800,
                fontSize: 12,
                textTransform: 'none',
                ...(active
                  ? { bgcolor: 'primary.main', color: '#F4F3F0', '&:hover': { bgcolor: 'primary.main' } }
                  : { color: 'text.primary', '&:hover': { bgcolor: colors.hoverPink } }),
              }}
            >
              {label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}

export function NextResultsButton({
  target,
  onNext,
  children,
}: {
  target: string;
  onNext: () => void;
  children: string;
}) {
  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' }, px: '20px', mt: '20px' }}>
        <Button
          fullWidth
          onClick={onNext}
          sx={{ bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: 999, py: '12px', fontFamily: ARCHIVO, fontWeight: 800, fontSize: 15, color: 'text.primary', textTransform: 'none', '&:hover': { bgcolor: colors.hoverPink } }}
        >
          {children}
        </Button>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', px: 'clamp(20px, 5vw, 96px)' }}>
        <Button
          onClick={() => scrollToId(target)}
          sx={{ fontSize: 14, fontWeight: 800, color: 'text.primary', textDecoration: 'underline', textUnderlineOffset: 3, '&:hover': { background: 'none', color: colors.muted } }}
        >
          {children}
        </Button>
      </Box>
    </>
  );
}
