import type { ChangeEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { aiSeoExampleDomain, aiSeoHeroTicks, exampleReport } from '../../../data/content';
import { useAiSeo } from '../../../providers/AiSeoProvider';
import { colors } from '../../../theme';
import { Highlight, PinkDot } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import AiSeoProgress from '../AiSeoProgress/AiSeoProgress';
import { ARCHIVO, scoreColor } from '../shared/aiSeoStyles';

/** Rotated example report card shown in the hero before a scan starts. */
function ExampleReportCard() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: `2px solid ${colors.ink}`,
        borderRadius: '20px',
        boxShadow: `6px 6px 0 ${colors.ink}`,
        transform: 'rotate(1deg)',
        p: { xs: '22px', md: '28px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '12px', md: '14px' },
        width: '100%',
        maxWidth: 480,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.muted }}>Example report</Typography>
        <Typography
          component="span"
          sx={{
            bgcolor: colors.hoverPink,
            borderRadius: 999,
            px: '12px',
            py: '5px',
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          {exampleReport.domain}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: 64, lineHeight: 1, letterSpacing: '-0.04em' }}>
          {exampleReport.score}
        </Typography>
        <Typography sx={{ color: colors.muted, fontWeight: 600, fontSize: 18 }}>/100</Typography>
      </Box>
      <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: { xs: 18, md: 20 }, letterSpacing: '-0.02em' }}>
        {exampleReport.verdict}
      </Typography>
      <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
        {exampleReport.areas.map((area) => (
          <Box
            component="li"
            key={area.label}
            sx={{ display: 'flex', alignItems: 'center', gap: '10px', py: { xs: '14px', md: '9px' }, borderTop: `1px solid ${colors.borderLight}` }}
          >
            <Box
              component="span"
              aria-hidden
              sx={{ flex: 'none', width: 10, height: 10, borderRadius: '50%', bgcolor: scoreColor(area.score), border: `1.5px solid ${colors.ink}` }}
            />
            <Typography sx={{ fontSize: { xs: 16, md: 14 }, fontWeight: 600 }}>{area.label}</Typography>
            <Box aria-hidden sx={{ flex: 1, borderBottom: `1px solid ${colors.borderLight}` }} />
            <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: { xs: 16, md: 14 } }}>{area.score}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function AiSeoHero() {
  const {
    domain,
    finishAnalysis,
    inputRef,
    setDomain,
    startAnalysis,
    status,
    validationError,
  } = useAiSeo();
  const scanning = status === 'scanning';
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (scanning) return;
    startAnalysis();
  };

  return (
    <Reveal
      id="ai-seo-hero"
      testId="ai-seo-hero"
      sx={{
        scrollMarginTop: '80px',
        px: 'clamp(20px, 5vw, 96px)',
        pt: { xs: '44px', md: '80px' },
        pb: { xs: '48px', md: '96px' },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
          gap: { xs: '36px', md: '56px' },
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '24px', md: '24px' }, alignItems: 'flex-start' }}>
          <Typography
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              bgcolor: 'background.paper',
              border: `2px solid ${colors.ink}`,
              borderRadius: 999,
              px: { xs: '12px', md: '14px' },
              py: { xs: '6px', md: '7px' },
              fontFamily: ARCHIVO,
              fontWeight: 800,
              fontSize: { xs: 12, md: 14 },
            }}
          >
            <PinkDot size={9} />
            Free · No signup · About 60 seconds
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 44, md: 'clamp(48px, 7vw, 104px)' }, letterSpacing: { xs: '-1.98px', md: undefined }, textWrap: 'balance' }}>
            Can AI
            <br />
            <Highlight hero>find you?</Highlight>
          </Typography>
          <Typography sx={{ fontSize: { xs: 19, md: 18 }, lineHeight: 1.55, color: colors.muted, maxWidth: 520, textWrap: 'pretty' }}>
            A free SEO and AI search audit. Find out if Google, ChatGPT, Claude and Perplexity can find, read and recommend
            your business.
          </Typography>

          <Box
            component="form"
            role="search"
            noValidate
            onSubmit={submit}
            sx={{
              width: '100%',
              maxWidth: { md: 540 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: '8px',
              bgcolor: 'background.paper',
              border: `2px solid ${colors.ink}`,
              borderRadius: '14px',
              boxShadow: `5px 5px 0 ${colors.pink}`,
              pl: { xs: '10px', sm: '20px' },
              pr: { xs: '10px', sm: '8px' },
              py: { xs: '10px', sm: '8px' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0, px: { xs: '8px', sm: 0 } }}>
              <Typography component="span" sx={{ display: { xs: 'none', sm: 'inline' }, fontSize: { sm: 17 }, color: colors.faint, flex: 'none' }}>
                https://
              </Typography>
              <Box
                component="input"
                ref={inputRef}
                aria-label="Website address"
                placeholder="yourbusiness.co.uk"
                value={domain}
                disabled={scanning}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDomain(e.target.value)}
                aria-invalid={Boolean(validationError)}
                aria-describedby={validationError ? 'domain-error' : undefined}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  border: 'none',
                  outline: 'none',
                  bgcolor: 'transparent',
                  font: 'inherit',
                  fontSize: { xs: 15, sm: 17 },
                  color: 'text.primary',
                  '&::placeholder': { color: colors.faint },
                  '&:disabled': { color: 'text.primary', WebkitTextFillColor: colors.ink, cursor: 'default' },
                }}
              />
            </Box>
            <Button
              type="submit"
              disabled={scanning}
              sx={{
                flex: 'none',
                borderRadius: '10px',
                px: { xs: '16px', sm: '24px' },
                py: { xs: '10px', sm: '15px' },
                fontSize: { xs: 14, sm: 17 },
                fontWeight: 800,
                color: 'primary.contrastText',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: '#3A3733' },
                '&.Mui-disabled': { bgcolor: colors.faint, color: colors.white },
              }}
            >
              {scanning ? 'Scanning…' : 'Scan my site →'}
            </Button>
          </Box>
          {validationError && (
            <Typography id="domain-error" role="alert" sx={{ mt: '-14px', fontSize: 14, color: '#A32620' }}>
              {validationError}
            </Typography>
          )}

          {!scanning && (
            <Typography sx={{ fontSize: 14, color: colors.muted }}>
              Or try an example:{' '}
              <Box
                component="button"
                type="button"
                onClick={() => startAnalysis(aiSeoExampleDomain)}
                sx={{
                  font: 'inherit',
                  fontWeight: 600,
                  color: 'text.primary',
                  bgcolor: 'transparent',
                  border: 'none',
                  p: 0,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                }}
              >
                {aiSeoExampleDomain}
              </Box>
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: { xs: '10px', md: '12px 24px' } }}>
            {aiSeoHeroTicks.map((tick) => (
              <Typography
                key={tick}
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'text.secondary',
                }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: { xs: '#F4F3F0', md: 'secondary.main' },
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    flex: 'none',
                  }}
                >
                  ✓
                </Box>
                {tick}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: { md: 'flex-end' }, py: '8px' }}>
          {scanning ? <AiSeoProgress domain={domain} onDone={finishAnalysis} /> : <ExampleReportCard />}
        </Box>
      </Box>
    </Reveal>
  );
}
