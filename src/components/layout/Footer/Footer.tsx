import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { contactEmail, navItems } from '../../../data/content';
import { colors } from '../../../theme';
import { Logo } from '../../common/BrandPrimitives/BrandPrimitives';

const chatLinks = [
  { label: contactEmail, href: `mailto:${contactEmail}` },
  { label: 'Book a free call', href: '/#contact' },
];

// Social and legal destinations are placeholders in the prototype. Rendered as
// plain text (not live-looking links) until approved destinations exist.
const socialPlaceholders = ['LinkedIn', 'Instagram'];
const legalPlaceholders = ['Privacy policy', 'Terms', 'Cookies'];

const columnLinkSx = {
  fontSize: 16,
  color: colors.bg,
  width: 'fit-content',
  transition: 'color 0.2s',
  '&:hover': { color: colors.pink },
} as const;

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography
        component="span"
        sx={{
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 800,
          fontSize: 19,
          letterSpacing: '-0.01em',
          color: colors.white,
          pb: '4px',
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: colors.bg, overflow: 'hidden' }}>
      <Box
        sx={{
          maxWidth: 1320,
          mx: 'auto',
          borderLeft: '1px solid #2E2C29',
          borderRight: '1px solid #2E2C29',
          px: 'clamp(20px, 5vw, 96px)',
          pt: '96px',
          pb: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '72px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '48px 80px',
            alignItems: 'start',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: 460 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.045em',
                color: colors.bg,
              }}
            >
              Still reading? Let&apos;s have a{' '}
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  bgcolor: 'secondary.main',
                  color: 'text.primary',
                  px: '0.14em',
                  transform: 'rotate(-1.5deg)',
                }}
              >
                natter.
              </Box>
            </Typography>
            <Typography sx={{ fontSize: 17, lineHeight: 1.6, color: '#B5AEA3' }}>
              A website that wins you work, and AI search that sends customers its way. No jargon, no hard sell.
            </Typography>
            <Button
              component={RouterLink}
              to="/#contact"
              sx={{
                alignSelf: 'flex-start',
                borderRadius: 999,
                px: '24px',
                py: '14px',
                fontSize: 16,
                color: 'primary.main',
                bgcolor: 'secondary.main',
                gap: '10px',
                transition: 'background 0.2s',
                '&:hover': { bgcolor: colors.bg },
              }}
            >
              <Box
                component="span"
                aria-hidden
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: colors.white,
                  border: `1.5px solid ${colors.ink}`,
                }}
              />
              Book a free call
            </Button>
          </Box>
          <Box
            component="nav"
            aria-label="Footer"
            sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '32px' }}
          >
            <Column title="Explore">
              {navItems.map((item) => (
                <Box key={item.id} component={RouterLink} to={`/#${item.id}`} sx={columnLinkSx}>
                  {item.label}
                </Box>
              ))}
            </Column>
            <Column title="Let's Chat">
              {chatLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Box key={link.label} component={RouterLink} to={link.href} sx={columnLinkSx}>
                    {link.label}
                  </Box>
                ) : (
                  <Box key={link.label} component="a" href={link.href} sx={columnLinkSx}>
                    {link.label}
                  </Box>
                ),
              )}
              {socialPlaceholders.map((label) => (
                <Typography key={label} component="span" sx={{ fontSize: 16, color: colors.bg }}>
                  {label}
                </Typography>
              ))}
            </Column>
            <Column title="Legal Stuff">
              {legalPlaceholders.map((label) => (
                <Typography key={label} component="span" sx={{ fontSize: 16, color: colors.bg }}>
                  {label}
                </Typography>
              ))}
            </Column>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: { xs: '16px', md: 'clamp(16px, 2.5vw, 40px)' },
            borderTop: '1px solid #2E2C29',
            pt: '56px',
          }}
        >
          <Logo size={{ xs: 54, md: 'clamp(56px, 8.8vw, 154px)' }} stroke={colors.bg} strokeWidth={4} />
          <Box
            component="span"
            sx={{
              display: 'block',
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900,
              fontSize: { xs: 40, md: 'clamp(42px, 8vw, 140px)' },
              letterSpacing: { xs: '-0.06em', md: '-0.065em' },
              lineHeight: { xs: 0.85, md: 0.78 },
              whiteSpace: 'nowrap',
              minWidth: 0,
            }}
          >
            meet pete.
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            fontSize: 14,
            color: '#8C857B',
          }}
        >
          <Typography component="span" sx={{ fontSize: 14, color: '#8C857B' }}>
            All copyright and trademarks reserved.
          </Typography>
          <Typography component="span" sx={{ fontSize: 14, color: '#8C857B' }}>
            Simplifying AI for your business.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
