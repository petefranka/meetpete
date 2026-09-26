import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { AiSeoProvider } from '../../providers/AiSeoProvider';
import theme from '../../theme';

export function renderWithApp(ui: ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <AiSeoProvider>{ui}</AiSeoProvider>
      </MemoryRouter>
    </ThemeProvider>,
  );
}
