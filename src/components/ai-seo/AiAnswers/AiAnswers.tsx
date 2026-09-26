import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { aiAnswerRows, aiAssistants } from '../../../data/content';
import { colors } from '../../../theme';
import { Highlight } from '../../common/BrandPrimitives/BrandPrimitives';
import Reveal from '../../common/Reveal/Reveal';
import Carousel from '../Carousel/Carousel';
import { ARCHIVO, greenPillSx } from '../shared/aiSeoStyles';

const headCellSx = {
  textAlign: 'left',
  fontFamily: ARCHIVO,
  fontWeight: 800,
  fontSize: { xs: 13, md: 15 },
  color: 'text.primary',
  px: { xs: '14px', md: '24px' },
  py: { xs: '12px', md: '18px' },
  borderBottom: `1px solid ${colors.border}`,
  whiteSpace: 'nowrap',
} as const;

const cellSx = {
  px: { xs: '14px', md: '24px' },
  py: { xs: '13px', md: '16px' },
  borderBottom: `1px solid ${colors.borderLight}`,
  verticalAlign: 'middle',
} as const;

/** "What AI says when customers ask." — prompt-by-assistant rank table. */
export default function AiAnswers() {
  return (
    <Reveal
      id="ai-answers"
      sx={{
        scrollMarginTop: '96px',
        borderTop: `1px solid ${colors.border}`,
        px: 'clamp(20px, 5vw, 96px)',
        py: { xs: '48px', md: '96px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '20px', md: '32px' },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
          gap: { xs: '18px', md: '32px' },
          alignItems: { md: 'end' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '12px', md: '16px' }, maxWidth: 640 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 'clamp(36px, 4.4vw, 60px)' }, textWrap: 'balance' }}>
            What AI says when <Highlight>customers ask.</Highlight>
          </Typography>
          <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: 18, lineHeight: 1.6, color: colors.muted }}>
            We asked four AI assistants the kind of questions your customers ask. Here&apos;s where you came up.
          </Typography>
          <Typography sx={{ display: { xs: 'block', md: 'none' }, fontSize: 16, lineHeight: 1.6, color: colors.muted }}>
            We asked four AI assistants what your customers ask.
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: `2px solid ${colors.ink}`,
            borderRadius: '16px',
            boxShadow: `5px 5px 0 ${colors.pink}`,
            p: { xs: '18px', md: '22px 26px' },
            width: { md: 340 },
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 16, lineHeight: 1.25, maxWidth: 130 }}>
              AI answers that mention you
            </Typography>
            <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: { xs: 44, md: 52 }, lineHeight: 1, letterSpacing: '-0.05em' }}>
              50%
            </Typography>
          </Box>
          <Box sx={{ height: 10, borderRadius: 999, border: `1px solid ${colors.ink}`, bgcolor: colors.bg, overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: '50%', bgcolor: 'secondary.main' }} />
          </Box>
          <Typography sx={{ fontSize: 13, lineHeight: 1.45, color: colors.faint }}>
            Based on 20 answers from ChatGPT, Claude, Perplexity and Gemini.
          </Typography>
        </Box>
      </Box>

      {/* Mobile: one card per prompt in a snap carousel. */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Carousel heading="The questions" cardWidth={260}>
          {aiAnswerRows.map((row) => (
            <Box
              key={row.prompt}
              sx={{
                width: 260,
                bgcolor: 'background.paper',
                border: `2px solid ${colors.ink}`,
                borderRadius: '14px',
                p: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <Typography sx={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 17, lineHeight: 1.3 }}>
                &ldquo;{row.prompt}&rdquo;
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {row.ranks.map((rank, i) => (
                  <Box key={aiAssistants[i]} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{aiAssistants[i]}</Typography>
                    {rank !== null ? (
                      <Typography component="span" sx={{ ...greenPillSx, px: '10px', py: '4px', fontSize: 12 }}>
                        ✓ #{rank}
                      </Typography>
                    ) : (
                      <Typography
                        component="span"
                        sx={{
                          display: 'inline-flex',
                          bgcolor: colors.bg,
                          border: `1px solid ${colors.border}`,
                          borderRadius: 999,
                          px: '10px',
                          py: '4px',
                          fontFamily: ARCHIVO,
                          fontWeight: 800,
                          fontSize: 12,
                          color: colors.label,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Not mentioned
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          bgcolor: 'background.paper',
          border: `2px solid ${colors.ink}`,
          borderRadius: '16px',
          boxShadow: `5px 5px 0 ${colors.ink}`,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ overflowX: 'auto' }}>
          <Box component="table" sx={{ width: '100%', minWidth: 720, borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr">
                <Box component="th" scope="col" sx={{ ...headCellSx, color: colors.muted }}>
                  Prompt
                </Box>
                {aiAssistants.map((name) => (
                  <Box component="th" scope="col" key={name} sx={headCellSx}>
                    {name}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {aiAnswerRows.map((row) => (
                <Box component="tr" key={row.prompt}>
                  <Box component="th" scope="row" sx={{ ...cellSx, textAlign: 'left', fontWeight: 600, fontSize: { xs: 15, md: 16 } }}>
                    &ldquo;{row.prompt}&rdquo;
                  </Box>
                  {row.ranks.map((rank, i) => (
                    <Box component="td" key={aiAssistants[i]} sx={cellSx}>
                      {rank !== null ? (
                        <Typography component="span" sx={{ ...greenPillSx, px: '12px', py: '5px', fontSize: 13 }}>
                          ✓ #{rank}
                        </Typography>
                      ) : (
                        <Typography
                          component="span"
                          sx={{
                            display: 'inline-flex',
                            bgcolor: colors.bg,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 999,
                            px: '12px',
                            py: '5px',
                            fontFamily: ARCHIVO,
                            fontWeight: 800,
                            fontSize: 13,
                            color: colors.label,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Not mentioned
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Typography sx={{ fontSize: { xs: 14, md: 15 }, color: colors.muted }}>
        A number shows where you were ranked in the answer.
        <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
          {' '}
          Pro tracks 50 prompts every week.
        </Box>
      </Typography>
    </Reveal>
  );
}
