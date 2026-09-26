'use client';

import Box from '@mui/material/Box';
import { AiSeoHero, AiSeoResults, SevenAreas, Upsell } from '../../components/ai-seo';
import { withPageLayout } from '../../components/layout';
import { useAiSeo } from '../../providers/AiSeoProvider';

function AiSeoPage() {
  const { focusDomainInput, status } = useAiSeo();

  return (
    <main>
      {status === 'results' ? (
        <AiSeoResults />
      ) : (
        <>
          <AiSeoHero />
          {status === 'idle' && <SevenAreas onAnalyseCta={focusDomainInput} />}
        </>
      )}
      <Upsell />
    </main>
  );
}

function ResultsFooterSpacer() {
  const { status } = useAiSeo();
  return status === 'results' ? (
    <Box aria-hidden sx={{ bgcolor: 'primary.main', height: { xs: '56px', md: '80px' } }} />
  ) : null;
}

export default withPageLayout(AiSeoPage, {
  headerVariant: 'aiSeo',
  AfterFooter: ResultsFooterSpacer,
});
