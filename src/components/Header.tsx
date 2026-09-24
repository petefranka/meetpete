import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { contactEmail, navItems } from '../data/content';
import { colors } from '../theme';
import { Logo, PinkDot } from './ui';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          bgcolor: 'rgba(244,243,240,0.94)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1320,
            margin: '0 auto',
            borderLeft: `1px solid ${colors.border}`,
            borderRight: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
            px: { xs: '16px', md: 'clamp(20px, 5vw, 96px)' },
            py: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: '10px', md: 3 },
          }}
        >
          <Box
            component="a"
            href="#top"
            aria-label="Meet Pete home"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'transform 0.3s cubic-bezier(.3,1.6,.5,1)',
              '&:hover': { transform: 'translateY(-3px) rotate(-6deg)' },
            }}
          >
            <Logo />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '8px', md: '10px' }, flex: 'none' }}>
            <Button
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
              sx={{
                borderRadius: 999,
                px: { xs: 0, md: '20px' },
                py: { xs: 0, md: '10px' },
                width: { xs: 42, md: 'auto' },
                height: { xs: 42, md: 'auto' },
                minWidth: { xs: 42, md: 0 },
                fontSize: 15,
                color: 'text.primary',
                border: `1px solid ${colors.ink}`,
                bgcolor: menuOpen ? 'secondary.main' : 'transparent',
                gap: '10px',
              }}
            >
              <Box
                aria-hidden
                sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '4px', md: '3px' }, alignItems: 'center' }}
              >
                <Box component="span" sx={{ width: { xs: 18, md: 16 }, height: 2, bgcolor: 'text.primary' }} />
                <Box component="span" sx={{ width: { xs: 18, md: 16 }, height: 2, bgcolor: 'text.primary' }} />
                <Box
                  component="span"
                  sx={{ width: 18, height: 2, bgcolor: 'text.primary', display: { xs: 'block', md: 'none' } }}
                />
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
                {menuOpen ? 'Close' : 'Menu'}
              </Box>
            </Button>
            <Button
              component="a"
              href="#contact"
              sx={{
                borderRadius: 999,
                px: { xs: '14px', md: '22px' },
                py: { xs: 0, md: '11px' },
                height: { xs: 42, md: 'auto' },
                fontSize: { xs: 14, md: 16 },
                lineHeight: { xs: 1, md: 'inherit' },
                color: 'primary.contrastText',
                bgcolor: 'primary.main',
                gap: '10px',
                '&:hover': { bgcolor: '#3A3733' },
              }}
            >
              <PinkDot />Book a free call
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!menuOpen}
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          bgcolor: 'secondary.main',
          display: 'flex',
          flexDirection: 'column',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: menuOpen
            ? 'transform 0.6s cubic-bezier(.7,0,.2,1), visibility 0s'
            : 'transform 0.6s cubic-bezier(.7,0,.2,1), visibility 0s 0.6s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <Box
          sx={{
            maxWidth: 1320,
            width: '100%',
            margin: '0 auto',
            px: 'clamp(20px, 5vw, 96px)',
            py: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(26,25,24,0.2)',
          }}
        >
          <Logo fill={colors.white} />
          <Button
            onClick={() => setMenuOpen(false)}
            autoFocus
            sx={{
              borderRadius: 999,
              px: '20px',
              py: { xs: '12px', md: '10px' },
              fontSize: 15,
              color: 'text.primary',
              border: `1px solid ${colors.ink}`,
            }}
          >
            ✕ Close
          </Button>
        </Box>
        <Box
          component="nav"
          aria-label="Site"
          sx={{
            flex: 1,
            maxWidth: 1320,
            width: '100%',
            margin: '0 auto',
            px: 'clamp(20px, 5vw, 96px)',
            py: '4vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {navItems.map((item, i) => (
            <Box
              key={item.id}
              component="a"
              href={`#${item.id}`}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                goTo(item.id);
              }}
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '24px',
                py: '1.2vh',
                borderBottom: '1px solid rgba(26,25,24,0.2)',
                overflow: 'hidden',
                '&:hover': { pl: '16px' },
                transition: 'padding 0.25s',
              }}
            >
              <Typography
                component="span"
                sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 16, opacity: 0.6, width: 32 }}
              >
                0{i + 1}
              </Typography>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900,
                  fontSize: { xs: 40, md: 'clamp(44px, 8.5vh, 104px)' },
                  letterSpacing: '-0.05em',
                  lineHeight: 1.02,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(110%)',
                  opacity: menuOpen ? 1 : 0,
                  transition: `transform 0.6s cubic-bezier(.2,.8,.2,1) ${menuOpen ? 0.25 + i * 0.07 : 0}s, opacity 0.4s ${menuOpen ? 0.25 + i * 0.07 : 0}s`,
                }}
              >
                {item.label}
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            maxWidth: 1320,
            width: '100%',
            margin: '0 auto',
            px: 'clamp(20px, 5vw, 96px)',
            pt: '20px',
            pb: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          <Box component="a" href={`mailto:${contactEmail}`}>{contactEmail}</Box>
          <Box
            component="a"
            href="#contact"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              goTo('contact');
            }}
            sx={{ borderBottom: `2px solid ${colors.ink}` }}
          >
            Book a free call →
          </Box>
        </Box>
      </Box>
    </>
  );
}
