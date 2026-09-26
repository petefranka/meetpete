import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { aiAnswer, aiQuestion, chatBooked, chatDemo } from '../../../data/content';
import { colors } from '../../../theme';
import { useLoopStep } from './useLoopStep';

function TypingDots({ dark = false }: { dark?: boolean }) {
  return (
    <Box
      sx={{
        alignSelf: 'flex-end',
        display: 'inline-flex',
        gap: '4px',
        px: '14px',
        py: '10px',
        borderRadius: '16px 16px 4px 16px',
        bgcolor: dark ? 'primary.main' : 'background.paper',
      }}
    >
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          component="span"
          sx={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            bgcolor: dark ? colors.bg : colors.faint,
            animation: 'pmBlink 1s infinite',
            animationDelay: `${index * 0.15}s`,
            '@keyframes pmBlink': {
              '0%, 100%': { opacity: 0.3 },
              '50%': { opacity: 1 },
            },
          }}
        />
      ))}
    </Box>
  );
}

const bubbleSx = {
  maxWidth: '86%',
  px: '16px',
  py: '12px',
  fontSize: 15,
  lineHeight: 1.45,
  transition: 'opacity 0.3s, transform 0.3s',
} as const;

export function ChatDemo() {
  const step = useLoopStep(7, 1100);
  const show = (from: number) => step >= from;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Box sx={{ ...bubbleSx, alignSelf: 'flex-start', bgcolor: 'background.paper', borderRadius: '16px 16px 16px 4px', opacity: show(0) ? 1 : 0, transform: show(0) ? 'none' : 'translateY(6px)' }}>
        {chatDemo[0].text}
      </Box>
      {step === 1 && <TypingDots dark />}
      <Box sx={{ ...bubbleSx, alignSelf: 'flex-end', bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: '16px 16px 4px 16px', opacity: show(2) ? 1 : 0, transform: show(2) ? 'none' : 'translateY(6px)', visibility: step === 1 ? 'hidden' : 'visible' }}>
        {chatDemo[1].text}
      </Box>
      <Box sx={{ ...bubbleSx, alignSelf: 'flex-start', bgcolor: 'background.paper', borderRadius: '16px 16px 16px 4px', opacity: show(3) ? 1 : 0, transform: show(3) ? 'none' : 'translateY(6px)' }}>
        {chatDemo[2].text}
      </Box>
      {step === 4 && <TypingDots dark />}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', opacity: show(5) ? 1 : 0, transform: show(5) ? 'none' : 'translateY(6px)', transition: 'opacity 0.3s, transform 0.3s', visibility: step === 4 ? 'hidden' : 'visible' }}>
        <Typography
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            bgcolor: 'background.paper',
            border: `1.5px solid ${colors.ink}`,
            borderRadius: 999,
            px: '13px',
            py: '7px',
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          <Box component="span" aria-hidden sx={{ color: 'secondary.main', WebkitTextStroke: `0.8px ${colors.ink}` }}>✓</Box>
          {chatBooked}
        </Typography>
      </Box>
    </Box>
  );
}

export function AiDemo() {
  const step = useLoopStep(5, 1300);
  const show = (from: number) => step >= from;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Box sx={{ ...bubbleSx, alignSelf: 'flex-end', bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: '16px 16px 4px 16px', opacity: show(0) ? 1 : 0, transform: show(0) ? 'none' : 'translateY(6px)' }}>
        {aiQuestion}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', minHeight: 34 }}>
        <Box
          component="span"
          aria-hidden
          sx={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            border: `1.5px solid ${colors.border}`,
            bgcolor: 'background.paper',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'secondary.main',
            fontSize: 14,
          }}
        >
          ✦
        </Box>
        {step === 1 && <TypingDots />}
      </Box>
      <Box sx={{ ...bubbleSx, alignSelf: 'flex-start', bgcolor: 'background.paper', borderRadius: '16px 16px 16px 4px', opacity: show(2) ? 1 : 0, transform: show(2) ? 'none' : 'translateY(6px)', maxWidth: '100%' }}>
        <Box component="span" sx={{ bgcolor: 'secondary.main', px: '4px', fontWeight: 600 }}>{aiAnswer.highlight}</Box>{' '}
        {aiAnswer.rest}
      </Box>
    </Box>
  );
}
