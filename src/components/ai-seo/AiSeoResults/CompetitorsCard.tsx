import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { aiSeoResult } from '../../../data/content';
import { colors } from '../../../theme';
import { ARCHIVO, scrollToId } from '../shared/aiSeoStyles';

export default function CompetitorsCard() {
  return (
    <Box>
      <Typography sx={{ display: { xs: 'block', md: 'none' }, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 20, letterSpacing: '-0.6px', mb: '10px' }}>
        {aiSeoResult.competitorNote}
      </Typography>
      <Button
        onClick={() => scrollToId('ready-to-fix')}
        sx={{ display: { xs: 'inline-flex', md: 'none' }, p: 0, mb: '16px', minWidth: 0, fontSize: 16, fontWeight: 600, color: 'text.primary', textDecoration: 'underline', textUnderlineOffset: 3, '&:hover': { background: 'none', color: colors.muted } }}
      >
        See who&apos;s ahead of you →
      </Button>
      <Box sx={{ bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: { xs: '14px', md: '20px' }, p: { xs: '16px', md: '28px' }, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <Box>
            <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>
              You vs. local competitors
            </Typography>
            <Typography sx={{ fontSize: 14, color: colors.muted }}>{aiSeoResult.competitorNote}</Typography>
          </Box>
          <Button
            onClick={() => scrollToId('ready-to-fix')}
            sx={{ p: 0, minWidth: 0, fontSize: 14, fontWeight: 800, color: 'text.primary', textDecoration: 'underline', textUnderlineOffset: 3, '&:hover': { background: 'none', color: colors.muted } }}
          >
            See who&apos;s ahead of you →
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {aiSeoResult.competitors.map((competitor) => (
            <Box key={competitor.name} sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Typography sx={{ width: { xs: 92, md: 120 }, flex: 'none', fontSize: 14, fontWeight: competitor.you ? 800 : 600, filter: { xs: competitor.you ? 'none' : 'blur(5px)', md: 'none' } }}>
                {competitor.name}
              </Typography>
              <Box aria-hidden sx={{ flex: 1, height: 12, borderRadius: 999, bgcolor: colors.track, border: competitor.you ? `1.5px solid ${colors.ink}` : 'none', overflow: 'hidden' }}>
                <Box sx={{ height: '100%', width: `${competitor.score}%`, bgcolor: competitor.you ? 'secondary.main' : { xs: '#DAD6CE', md: 'primary.main' } }} />
              </Box>
              <Typography sx={{ width: 32, textAlign: 'right', fontFamily: ARCHIVO, fontWeight: 800, fontSize: 14, flex: 'none', filter: { xs: competitor.you ? 'none' : 'blur(5px)', md: 'none' } }}>
                {competitor.score}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
