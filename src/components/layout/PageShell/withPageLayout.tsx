import type { ComponentType } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PageShell from './PageShell';

interface PageLayoutOptions {
  headerVariant?: 'home' | 'aiSeo';
  AfterFooter?: ComponentType;
}

export function withPageLayout<P extends object>(
  Page: ComponentType<P>,
  { headerVariant = 'home', AfterFooter }: PageLayoutOptions = {},
) {
  function PageWithLayout(props: P) {
    return (
      <>
        <Header variant={headerVariant} />
        <PageShell>
          <Page {...props} />
        </PageShell>
        <Footer />
        {AfterFooter && <AfterFooter />}
      </>
    );
  }

  PageWithLayout.displayName = `withPageLayout(${Page.displayName ?? Page.name ?? 'Page'})`;
  return PageWithLayout;
}
