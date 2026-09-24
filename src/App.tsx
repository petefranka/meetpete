import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import About from './components/About';
import BeforeAfter from './components/BeforeAfter';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Pricing from './components/Pricing';
import Process from './components/Process';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import theme, { colors } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          maxWidth: 1320,
          mx: 'auto',
          borderLeft: `1px solid ${colors.border}`,
          borderRight: `1px solid ${colors.border}`,
        }}
      >
        <main>
          <Hero />
          <BeforeAfter />
          <PainPoints />
          <Services />
          <Process />
          <Pricing />
          <About />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
