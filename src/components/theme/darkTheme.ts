import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: '#020617',
    },
    text: {
      primary: '#e5e7eb',
      secondary: '#9ca3af',
    },
  },
  shape: { borderRadius: 12 },
});
