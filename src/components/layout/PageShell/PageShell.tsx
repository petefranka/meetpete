import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { colors } from '../../../theme';

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        maxWidth: 1320,
        mx: 'auto',
        borderLeft: `1px solid ${colors.border}`,
        borderRight: `1px solid ${colors.border}`,
      }}
    >
      {children}
    </Box>
  );
}
