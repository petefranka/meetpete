import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { beforeAfter } from '../data/content';
import { colors } from '../theme';
import Reveal from './Reveal';
import { Highlight } from './ui';

export default function BeforeAfter() {
  return (
    <Reveal
      sx={{
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '52px', md: '64px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Typography variant="h2" sx={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
        Your week, <Highlight>glow-up</Highlight> edition.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          columnGap: '64px',
        }}
      >
        {beforeAfter.map((row) => (
          <Box
            key={row.before}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '16px',
              alignItems: 'baseline',
              py: '18px',
              borderTop: `1px solid ${colors.border}`,
              fontSize: 17,
              transition: 'transform 0.25s',
              '&:hover': { transform: 'translateX(6px)' },
            }}
          >
            <Box component="span" sx={{ color: colors.faint, textDecoration: 'line-through', textDecorationColor: colors.strike }}>
              {row.before}
            </Box>
            <Box
              component="span"
              aria-hidden
              sx={{
                color: 'text.primary',
                bgcolor: 'secondary.main',
                border: `2px solid ${colors.ink}`,
                borderRadius: '50%',
                width: 28,
                height: 28,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
              }}
            >
              →
            </Box>
            <Box component="span">{row.after}</Box>
          </Box>
        ))}
      </Box>
    </Reveal>
  );
}
