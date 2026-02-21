import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#38bdf8' },
    secondary: { main: '#818cf8' },
    background: {
      default: '#060d1a',
      paper: '#0f172a',
    },
    success: { main: '#34d399' },
    error: { main: '#f87171' },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { fontSize: 13 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 13,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#38bdf8' },
        },
      },
    },
  },
});