import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Service } from '../../../models';
import { useAiSeo } from '../../../providers/AiSeoProvider';
import { colors } from '../../../theme';
import { PinkDot } from '../../common/BrandPrimitives/BrandPrimitives';
import { AiDemo, ChatDemo } from './ServiceDemos';

export default function ServiceCard({ service }: { service: Service }) {
  const { resetAnalysis } = useAiSeo();

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: `2px solid ${colors.ink}`,
        borderRadius: '20px',
        boxShadow: `6px 6px 0 ${colors.ink}`,
        p: { xs: '24px', md: 'clamp(28px, 3vw, 40px)' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '18px', md: '22px' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: { xs: '10px', md: '16px' } }}>
        <Typography component="span" sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: { xs: 34, md: 44 }, letterSpacing: '-0.04em', lineHeight: 1 }}>
          {service.num}
        </Typography>
        <Typography
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            bgcolor: colors.hoverPink,
            borderRadius: 999,
            px: '13px',
            py: '7px',
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 700,
            fontSize: { xs: 12, md: 13 },
            whiteSpace: 'nowrap',
          }}
        >
          <PinkDot size={8} />
          {service.tier}
        </Typography>
      </Box>
      <Typography variant="h3" sx={{ fontSize: { xs: 30, md: 'clamp(30px, 3vw, 40px)' } }}>
        {service.title}
      </Typography>
      <Typography sx={{ fontSize: { xs: 15, md: 16 }, lineHeight: 1.6, color: colors.body }}>
        {service.body}
      </Typography>

      <Box aria-hidden sx={{ bgcolor: colors.track, borderRadius: '14px', p: { xs: '14px', md: '20px' }, display: 'flex', flexDirection: 'column', gap: '12px', minHeight: { md: 300 } }}>
        <Typography component="span" sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 12, color: colors.muted }}>
          What it looks like
        </Typography>
        {service.demo === 'chat' ? (
          <Box sx={{ bgcolor: 'background.paper', border: `1.5px solid ${colors.ink}`, borderRadius: '12px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', px: '14px', py: '10px', borderBottom: `1px solid ${colors.borderLight}` }}>
              <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main', border: `1px solid ${colors.ink}` }} />
              <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', border: `1px solid ${colors.border}` }} />
              <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', border: `1px solid ${colors.border}` }} />
              <Typography component="span" sx={{ flex: 1, textAlign: 'center', fontSize: 12, color: colors.muted }}>
                yourbusiness.co.uk
              </Typography>
            </Box>
            <Box sx={{ p: '14px', flex: 1 }}>
              <ChatDemo />
            </Box>
          </Box>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <AiDemo />
            <Box sx={{ pt: '14px' }}>
              <Button
                component={Link}
                href="/ai-seo"
                onClick={resetAnalysis}
                tabIndex={-1}
                sx={{
                  p: 0,
                  minWidth: 0,
                  fontSize: { xs: 15, md: 16 },
                  fontWeight: 800,
                  color: 'text.primary',
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  '&:hover': { background: 'none', color: colors.muted },
                }}
              >
                Could it be yours? Check your site free →
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
        {service.features.map((feature) => (
          <Box component="li" key={feature} sx={{ display: 'flex', alignItems: 'center', gap: '12px', py: '12px', borderTop: `1px solid ${colors.borderLight}`, fontSize: 15 }}>
            <Box component="span" aria-hidden sx={{ flex: 'none', width: 20, height: 20, borderRadius: '50%', bgcolor: 'primary.main', color: 'primary.contrastText', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
              ✓
            </Box>
            {feature}
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <Typography sx={{ fontSize: 14, color: colors.muted }}>{service.footer}</Typography>
        <Button component="a" href="#contact" sx={{ borderRadius: 999, px: '20px', py: '10px', fontSize: 15, color: 'text.primary', bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, boxShadow: `3px 3px 0 ${colors.ink}`, gap: '10px', '&:hover': { bgcolor: colors.hoverPink } }}>
          <PinkDot size={8} />
          Talk about this
        </Button>
      </Box>
    </Box>
  );
}
