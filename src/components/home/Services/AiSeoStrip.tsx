import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAiSeo } from '../../../providers/AiSeoProvider';
import { colors } from '../../../theme';

export default function AiSeoStrip() {
  const [domain, setDomain] = useState('');
  const navigate = useNavigate();
  const { resetAnalysis, startAnalysis } = useAiSeo();

  return (
    <Box
      sx={{
        bgcolor: '#FFE3F1',
        border: `2px solid ${colors.ink}`,
        borderRadius: '18px',
        p: { xs: '22px', md: 'clamp(24px, 3vw, 36px)' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: '18px', md: '40px' },
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Typography sx={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: { xs: 22, md: 28 }, letterSpacing: '-0.025em' }}>
          Not sure where you stand?
        </Typography>
        <Typography sx={{ fontSize: 15, color: colors.muted }}>
          Get a free SEO and AI visibility check in about 60 seconds. No signup.
        </Typography>
      </Box>
      <Button
        component={RouterLink}
        to="/ai-seo"
        onClick={resetAnalysis}
        sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', borderRadius: '10px', py: '15px', fontSize: 16, color: 'primary.contrastText', bgcolor: 'primary.main', '&:hover': { bgcolor: '#3A3733' } }}
      >
        Check my site free →
      </Button>
      <Box
        component="form"
        role="search"
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          if (startAnalysis(domain)) navigate('/ai-seo');
        }}
        sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '8px', bgcolor: 'background.paper', border: `2px solid ${colors.ink}`, borderRadius: '14px', boxShadow: `5px 5px 0 ${colors.pink}`, pl: '18px', pr: '6px', py: '6px' }}
      >
        <Typography component="span" sx={{ fontSize: 15, color: colors.faint, flex: 'none' }}>
          https://
        </Typography>
        <Box
          component="input"
          aria-label="Website address"
          placeholder="yourbusiness.co.uk"
          value={domain}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDomain(event.target.value)}
          sx={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', bgcolor: 'transparent', font: 'inherit', fontSize: 15, color: 'text.primary', '&::placeholder': { color: colors.faint } }}
        />
        <Button type="submit" sx={{ flex: 'none', borderRadius: '10px', px: { xs: '16px', md: '24px' }, py: '12px', fontSize: 15, color: 'primary.contrastText', bgcolor: 'primary.main', '&:hover': { bgcolor: '#3A3733' } }}>
          Scan my site →
        </Button>
      </Box>
    </Box>
  );
}
