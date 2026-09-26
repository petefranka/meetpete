import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { quickWins } from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import Carousel from '../Carousel/Carousel';
import { ARCHIVO } from '../shared/aiSeoStyles';

function QuickWinCard({ win, index, width }: { win: (typeof quickWins)[number]; index: number; width?: number }) {
  return (
    <Box sx={{ width, bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: '14px', boxShadow: `5px 5px 0 ${colors.ink}`, p: { xs: '20px', md: '28px' }, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
        <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: { xs: 36, md: 44 }, lineHeight: 1, letterSpacing: '-0.05em' }}>
          {String(index + 1).padStart(2, '0')}
        </Typography>
        <Typography component="span" sx={{ bgcolor: '#8EE3B5', color: 'text.primary', border: `1px solid ${colors.ink}`, borderRadius: 999, px: '12px', py: '6px', fontFamily: ARCHIVO, fontWeight: 800, fontSize: { xs: 13, md: 15 }, whiteSpace: 'nowrap' }}>
          +{win.points} pts
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: { xs: 20, md: 22 }, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        {win.headline}
      </Typography>
      <Typography sx={{ fontSize: { xs: 15, md: 16 }, lineHeight: 1.55, color: 'text.secondary' }}>{win.fix}</Typography>
    </Box>
  );
}

export default function QuickWinsSection() {
  return (
    <Reveal
      id="quick-wins"
      sx={{ scrollMarginTop: '96px', borderTop: `1px solid ${colors.border}`, px: 'clamp(20px, 5vw, 96px)', py: { xs: '48px', md: '96px' }, display: 'flex', flexDirection: 'column', gap: { xs: '20px', md: '32px' } }}
    >
      <Typography variant="h2" sx={{ display: { xs: 'none', md: 'block' }, fontSize: 'clamp(36px, 4.4vw, 60px)', textWrap: 'balance' }}>
        Your top 3 <Highlight>quick wins.</Highlight>
      </Typography>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Carousel heading="Top 3 quick wins" cardWidth={260}>
          {quickWins.map((win, index) => <QuickWinCard key={win.headline} win={win} index={index} width={260} />)}
        </Carousel>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {quickWins.map((win, index) => <QuickWinCard key={win.headline} win={win} index={index} />)}
      </Box>
    </Reveal>
  );
}
