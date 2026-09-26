import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { actionPlan, quickWins } from '../../../data/content';
import { colors } from '../../../theme';
import { scrollToId } from '../shared/aiSeoStyles';

export default function StickyResultsBar() {
  const issueCount = actionPlan.filter((item) => item.priority !== 'Passing').length;
  const quickPoints = quickWins.reduce((sum, win) => sum + win.points, 0);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 12, md: 20 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: { xs: '8px', md: '12px' },
        bgcolor: 'background.paper',
        border: `2px solid ${colors.ink}`,
        borderRadius: 999,
        boxShadow: `4px 4px 0 ${colors.ink}`,
        pl: { xs: '16px', md: '20px' },
        pr: { xs: '6px', md: '8px' },
        py: '6px',
        maxWidth: 'calc(100vw - 24px)',
      }}
    >
      <Typography sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600, whiteSpace: 'nowrap' }}>
        <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
          {issueCount} issues found. Fixing the top 3 could add {quickPoints} points.
        </Box>
        <Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>
          {issueCount} issues found
        </Box>
      </Typography>
      <Button
        onClick={() => scrollToId('email-report')}
        sx={{ display: { xs: 'none', md: 'inline-flex' }, borderRadius: 999, px: '16px', py: '8px', fontSize: 13, color: 'text.primary', bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, '&:hover': { bgcolor: colors.hoverPink } }}
      >
        Email me the report
      </Button>
      <Button
        onClick={() => scrollToId('ready-to-fix')}
        sx={{ borderRadius: 999, px: { xs: '14px', md: '16px' }, py: '8px', fontSize: 13, color: 'primary.contrastText', bgcolor: 'primary.main', '&:hover': { bgcolor: '#3A3733' } }}
      >
        Get it fixed →
      </Button>
    </Box>
  );
}
