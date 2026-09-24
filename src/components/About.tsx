import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';
import Reveal from './Reveal';
import { Highlight } from './ui';

export default function About() {
  return (
    <Reveal
      id="about"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      }}
    >
      <Box
        role="img"
        aria-label="Portrait of Pete"
        sx={{
          minHeight: 560,
          background: `repeating-linear-gradient(135deg, ${colors.pink} 0 12px, #FFB3D9 12px 24px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 600,
          fontSize: 12,
          color: 'rgba(26,25,24,0.55)',
        }}
      >
        Portrait of Pete
      </Box>
      <Box
        sx={{
          px: 'clamp(20px, 5vw, 96px)',
          py: { xs: '96px', md: 'clamp(64px, 8vw, 120px)' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: { xs: '26px', md: '28px' },
        }}
      >
        <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 'clamp(34px, 4vw, 52px)' }, textWrap: 'balance' }}>
          Hi, I&apos;m Pete.
          <br />
          <Highlight>Nice to meet you.</Highlight>
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: 1.7, color: colors.body, maxWidth: 520 }}>
          Pete spent 10 years inside large retail brands, where whole teams exist to squeeze every hour out of
          every process. That&apos;s the same level of thinking your business gets, without the big-company price
          tag.
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: 1.7, color: colors.body, maxWidth: 520 }}>
          The result: smart tools that actually fit how you work, set up properly and explained in plain English.
        </Typography>
        <Typography
          sx={{
            borderLeft: `4px solid ${colors.pink}`,
            pl: { xs: '18px', md: '20px' },
            fontFamily: "'Archivo', sans-serif",
            fontWeight: { xs: 800, md: 700 },
            fontSize: { xs: 20, md: 'clamp(20px, 1.9vw, 26px)' },
            lineHeight: { xs: 1.3, md: 1.35 },
            letterSpacing: { xs: '-0.02em', md: '-0.015em' },
            maxWidth: 520,
          }}
        >
          You deal with one person from start to finish. No hand-offs, no account managers, no chasing.
        </Typography>
      </Box>
    </Reveal>
  );
}
