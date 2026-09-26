import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import RouteScrollManager from './components/routing/RouteScrollManager/RouteScrollManager';
import { AiSeoProvider } from './providers/AiSeoProvider';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AiSeoProvider>
          <RouteScrollManager />
          <App />
        </AiSeoProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
