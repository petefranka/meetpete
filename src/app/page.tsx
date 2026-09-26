import {
  BeforeAfter,
  Contact,
  Faq,
  Hero,
  PainPoints,
  Pricing,
  Process,
  Services,
  Testimonials,
} from '../components/home';
import { withPageLayout } from '../components/layout';

function HomePage() {
  return (
    <main>
      <Hero />
      <BeforeAfter />
      <PainPoints />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
  );
}

export default withPageLayout(HomePage);
