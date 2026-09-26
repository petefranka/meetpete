import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { aiSeoResult } from '../../../data/content';
import { useAiSeo } from '../../../providers/AiSeoProvider';
import { colors } from '../../../theme';
import { PillButton } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import ActionPlan from '../ActionPlan/ActionPlan';
import AiAnswers from '../AiAnswers/AiAnswers';
import Carousel from '../Carousel/Carousel';
import EmailReport from '../EmailReport/EmailReport';
import { ARCHIVO, inkCardSx, pastelScoreColor, scoreColor } from '../shared/aiSeoStyles';
import CompetitorsCard from './CompetitorsCard';
import { MobileResultsTabs, NextResultsButton, tabSx, type ResultsTab } from './ResultsNavigation';
import StickyResultsBar from './StickyResultsBar';

function ScoreBar({ score }: { score: number | null }) {
  return (
    <Box
      aria-hidden
      sx={{ width: { xs: 64, md: 90 }, height: 8, borderRadius: 999, bgcolor: colors.track, overflow: 'hidden', flex: 'none' }}
    >
      <Box sx={{ height: '100%', width: score === null ? '100%' : `${score}%`, bgcolor: scoreColor(score) }} />
    </Box>
  );
}

export default function AiSeoResults() {
  const { domain, resetAnalysis } = useAiSeo();
  const [tab, setTab] = useState<ResultsTab>('overview');

  return (
    <>
      <Reveal
        id="results"
        testId="ai-seo-results"
        sx={{
          scrollMarginTop: '96px',
          px: 'clamp(20px, 5vw, 96px)',
          pt: { xs: '20px', md: '72px' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '20px', md: '24px' },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: { xs: 15, md: 14 }, color: colors.muted }}>
            Results for{' '}
            <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {domain}
            </Box>
            <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
              {' '}
              · {aiSeoResult.meta}
            </Box>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <PillButton onClick={resetAnalysis}>↺ Scan another site</PillButton>
          </Box>
          <Button
            onClick={resetAnalysis}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              bgcolor: 'background.paper',
              border: `2px solid ${colors.ink}`,
              borderRadius: 999,
              px: '12px',
              py: '7px',
              fontFamily: ARCHIVO,
              fontWeight: 800,
              fontSize: 13,
              color: 'text.primary',
              textTransform: 'none',
              '&:hover': { bgcolor: colors.hoverPink },
            }}
          >
            ↺ New scan
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: '16px', md: '24px' } }}>
          <Box
            sx={{
              ...inkCardSx,
              borderRadius: { xs: '16px', md: '20px' },
              boxShadow: { xs: `5px 5px 0 ${colors.pink}`, md: `6px 6px 0 ${colors.ink}` },
              p: { xs: '20px', md: '32px' },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '14px', md: '16px' },
              alignItems: 'flex-start',
            }}
          >
            <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: 13, fontWeight: 600, color: colors.muted }}>
              AI Visibility Score
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: { xs: 72, md: 96 }, lineHeight: 1, letterSpacing: { xs: '-4.32px', md: '-0.04em' } }}>
                  {aiSeoResult.score}
                </Typography>
                <Typography sx={{ color: colors.faint, fontWeight: { xs: 800, md: 600 }, fontSize: { xs: 20, md: 18 } }}>/100</Typography>
              </Box>
              <Typography
                sx={{ display: { xs: 'block', md: 'none' }, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 16, color: colors.ink, textAlign: 'right' }}
              >
                AI visibility score
              </Typography>
            </Box>
            <Box
              role="progressbar"
              aria-valuenow={aiSeoResult.score}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="AI Visibility Score"
              sx={{
                width: '100%',
                height: 14,
                borderRadius: 999,
                border: { xs: `2px solid ${colors.ink}`, md: `1.5px solid ${colors.ink}` },
                bgcolor: colors.track,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${aiSeoResult.score}%`,
                  bgcolor: { xs: pastelScoreColor(aiSeoResult.score), md: 'secondary.main' },
                }}
              />
            </Box>
            <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: { xs: 21, md: 24 }, letterSpacing: { xs: '-0.63px', md: '-0.02em' } }}>
              {aiSeoResult.verdict}
            </Typography>
            <Typography sx={{ fontSize: 15, lineHeight: 1.55, color: { xs: '#4A4640', md: colors.muted } }}>{aiSeoResult.issueSummary}</Typography>
          </Box>

          {/* Desktop: full area list card. Mobile: carousel below the score card. */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              bgcolor: 'background.paper',
              border: `2px solid ${colors.ink}`,
              borderRadius: '20px',
              p: '24px',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {aiSeoResult.areas.map((area, i) => (
              <Box
                key={area.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  py: '10px',
                  borderTop: i === 0 ? 'none' : `1px solid ${colors.borderLight}`,
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{area.label}</Typography>
                  <Typography sx={{ fontSize: 12.5, color: colors.muted }}>{area.question}</Typography>
                </Box>
                <ScoreBar score={area.score} />
                <Typography
                  sx={{
                    width: 38,
                    textAlign: 'right',
                    fontFamily: ARCHIVO,
                    fontWeight: 800,
                    fontSize: 14,
                    color: area.score === null ? colors.faint : 'text.primary',
                    flex: 'none',
                  }}
                >
                  {area.score ?? 'N/A'}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

      </Reveal>

      {/* Everything below the score card sits under the sticky mobile tab bar. */}
      <Box sx={{ position: 'relative' }}>
        <MobileResultsTabs tab={tab} onChange={setTab} />

        <Box sx={tabSx(tab, 'overview')}>
          <Box
            sx={{
              px: 'clamp(20px, 5vw, 96px)',
              pt: { xs: '20px', md: '24px' },
              pb: { xs: '8px', md: '96px' },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '28px', md: '24px' },
            }}
          >
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Carousel heading="Seven areas">
                {aiSeoResult.areas.map((area) => (
                  <Box
                    key={area.label}
                    sx={{
                      width: 203,
                      bgcolor: 'background.paper',
                      border: `2px solid ${colors.ink}`,
                      borderRadius: '14px',
                      p: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 16 }}>{area.label}</Typography>
                    <Typography sx={{ fontSize: 13, lineHeight: '17.55px', color: colors.muted, minHeight: 53 }}>
                      {area.question}
                    </Typography>
                    <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: 36, letterSpacing: '-1.44px', lineHeight: 1, color: area.score === null ? colors.faint : 'text.primary' }}>
                      {area.score ?? 'N/A'}
                    </Typography>
                    <Box aria-hidden sx={{ height: 10, borderRadius: 999, border: `1px solid ${colors.ink}`, bgcolor: colors.track, overflow: 'hidden' }}>
                      <Box sx={{ height: '100%', width: area.score === null ? '0%' : `${area.score}%`, bgcolor: pastelScoreColor(area.score) }} />
                    </Box>
                  </Box>
                ))}
              </Carousel>
            </Box>
            <CompetitorsCard />
          </Box>
          <NextResultsButton target="ai-answers" onNext={() => setTab('ai')}>
            Next: what AI says →
          </NextResultsButton>
        </Box>

        <Box sx={tabSx(tab, 'ai')}>
          <AiAnswers />
          <NextResultsButton target="quick-wins" onNext={() => setTab('fixes')}>
            Next: how to fix it →
          </NextResultsButton>
        </Box>

        <Box sx={tabSx(tab, 'fixes')}>
          <ActionPlan />
          <EmailReport domain={domain} />
        </Box>
      </Box>
      <StickyResultsBar />
    </>
  );
}
