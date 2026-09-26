import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { beforeAfter } from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';

export default function BeforeAfter() {
  return (
    <Reveal
      testId="home-before-after"
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
        Your website, <Highlight>glow-up</Highlight> edition.
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
              gridTemplateColumns: { xs: 'auto 1fr', md: '1fr auto 1fr' },
              gridTemplateAreas: {
                xs: '"arrow before" "arrow after"',
                md: '"before arrow after"',
              },
              gap: { xs: '6px 16px', md: '16px' },
              alignItems: { xs: 'start', md: 'baseline' },
              py: '18px',
              borderTop: `1px solid ${colors.border}`,
              fontSize: 17,
              transition: 'transform 0.25s',
              '&:hover': { transform: 'translateX(6px)' },
            }}
          >
            <Box
              component="span"
              sx={{
                gridArea: 'before',
                color: colors.faint,
                textDecoration: 'line-through',
                textDecorationColor: colors.strike,
              }}
            >
              {row.before}
            </Box>
            <Box
              component="span"
              aria-hidden
              sx={{
                gridArea: 'arrow',
                alignSelf: 'center',
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
            <Box component="span" sx={{ gridArea: 'after' }}>{row.after}</Box>
          </Box>
        ))}
      </Box>
    </Reveal>
  );
}
