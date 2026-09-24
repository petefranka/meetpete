import { createTheme } from '@mui/material/styles';

// Brand tokens lifted from the prototypes. The stock Material look is overridden
// to match: warm off-white canvas, near-black ink, bright pink accent.
export const colors = {
  bg: '#F4F3F0',
  ink: '#1A1918',
  pink: '#FF8AC4',
  white: '#FFFFFF',
  body: '#4A4640',
  muted: '#6B665F',
  faint: '#9A9187',
  border: '#E2DFD9',
  borderLight: '#EFECE6',
  input: '#E4E1DB',
  track: '#ECEBE7',
  hoverPink: '#FFE3F1',
  strike: '#C9C3B9',
} as const;

const theme = createTheme({
  palette: {
    background: { default: colors.bg, paper: colors.white },
    text: { primary: colors.ink, secondary: colors.body, disabled: colors.faint },
    primary: { main: colors.ink, contrastText: colors.bg },
    secondary: { main: colors.pink, contrastText: colors.ink },
    divider: colors.border,
  },
  typography: {
    fontFamily: "'Instrument Sans', system-ui, sans-serif",
    h1: { fontFamily: "'Archivo', sans-serif", fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1 },
    h2: { fontFamily: "'Archivo', sans-serif", fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.03 },
    h3: { fontFamily: "'Archivo', sans-serif", fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h4: { fontFamily: "'Archivo', sans-serif", fontWeight: 800, letterSpacing: '-0.025em' },
    h5: { fontFamily: "'Archivo', sans-serif", fontWeight: 700 },
    h6: { fontFamily: "'Archivo', sans-serif", fontWeight: 700 },
    button: { fontFamily: "'Archivo', sans-serif", fontWeight: 800, textTransform: 'none' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 800,
          whiteSpace: 'nowrap',
        },
      },
    },
  },
});

export default theme;
