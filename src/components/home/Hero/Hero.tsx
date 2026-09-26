import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../../../theme';
import { Highlight, PinkDot, PrimaryCta, SecondaryCta } from '../../common/BrandPrimitives/BrandPrimitives';

const reassurances = ['Free 30-min call', 'No jargon', 'Cancel any time'];

export default function Hero() {
  return (
    <Box
      component="section"
      id="top"
      data-testid="home-hero"
      sx={{
        position: 'relative',
        px: 'clamp(20px, 5vw, 96px)',
        pt: { xs: '48px', md: '110px' },
        pb: { xs: '56px', md: '96px' },
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src="/hero-doodles.svg"
        alt=""
        aria-hidden
        className="hero-fade"
        sx={{
          position: 'absolute',
          right: '-6%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(50%, 600px)',
          height: 'auto',
          opacity: 0.85,
          pointerEvents: 'none',
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: { xs: '22px', md: '40px' } }}>
        <Typography
          component="span"
          sx={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            bgcolor: 'background.paper',
            border: `2px solid ${colors.ink}`,
            borderRadius: 999,
            px: { xs: '12px', md: '14px' },
            py: { xs: '6px', md: '7px' },
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 800,
            fontSize: { xs: 12, md: 14 },
          }}
        >
          <PinkDot size={9} />AI, made simple
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 50, md: 'clamp(48px, 7vw, 104px)' },
            maxWidth: { xs: 'none', md: 'min(980px, 72%)' },
            lineHeight: { xs: 0.98, md: 1 },
            letterSpacing: { xs: '-0.05em', md: '-0.045em' },
            textWrap: { xs: 'wrap', md: 'balance' },
          }}
        >
          Get{' '}
          <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
            your business{' '}
          </Box>
          ready for the{' '}
          <Box component="span" className="hero-highlight" sx={{ display: 'inline-block' }}>
            <Highlight hero>AI era.</Highlight>
          </Box>
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 17, md: 'clamp(19px, 1.7vw, 23px)' },
            lineHeight: 1.55,
            color: 'text.secondary',
            maxWidth: { xs: 'none', md: 'min(560px, 55%)' },
            textWrap: 'pretty',
          }}
        >
          AI-powered websites and AI-SEO that get small businesses found, chosen and booked.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: { xs: 'stretch', md: 'center' },
            pt: { xs: '6px', md: 0 },
          }}
        >
          <PrimaryCta
            component="a"
            href="#contact"
            sx={{ justifyContent: 'center', py: { xs: '17px', md: '15px' }, px: { xs: '17px', md: '26px' } }}
          >
            <PinkDot bordered={false} />Book a free call
          </PrimaryCta>
          <Box sx={{ position: 'relative' }}>
            <SecondaryCta
              component="a"
              href="#services"
              sx={{
                width: { xs: '100%', md: 'auto' },
                justifyContent: 'center',
                py: { xs: '15px', md: '13px' },
                px: { xs: '15px', md: '26px' },
              }}
            >
              See what&apos;s possible
              <Box component="span" aria-hidden sx={{ display: { xs: 'inline', md: 'none' }, ml: '8px' }}>
                ↓
              </Box>
            </SecondaryCta>
            <Box
              component="svg"
              viewBox="0 0 90 150"
              aria-hidden
              sx={{
                position: 'absolute',
                left: 'calc(100% + 6px)',
                top: '50%',
                width: 90,
                height: 150,
                overflow: 'visible',
                pointerEvents: 'none',
                display: { xs: 'none', md: 'block' },
              }}
            >
              <path d="M2 0 C 40 -4, 74 14, 74 52 C 74 84, 70 112, 64 140" fill="none" stroke={colors.ink} strokeWidth={3} strokeLinecap="round" />
              <path d="M53 128 L 63 142 L 75 131" fill="none" stroke={colors.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: { xs: 'nowrap', md: 'wrap' },
            justifyContent: { xs: 'space-between', md: 'flex-start' },
            gap: { xs: '8px', md: '12px 24px' },
            pt: { xs: '6px', md: 0 },
          }}
        >
          {reassurances.map((label) => (
            <Typography
              key={label}
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: { xs: '5px', md: '8px' },
                fontSize: { xs: 12, md: 15 },
                fontWeight: 600,
                color: 'text.secondary',
                whiteSpace: 'nowrap',
              }}
            >
              <Box
                component="span"
                aria-hidden
                sx={{
                  width: { xs: 14, md: 18 },
                  height: { xs: 14, md: 18 },
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'secondary.main',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: 9, md: 10 },
                }}
              >
                ✓
              </Box>
              {label}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
