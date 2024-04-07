import { createTheme } from '@mui/material/styles';

// Skapa ett anpassat tema
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffeb3b', // En nyans av gul som den primära färgen
      contrastText: '#000', // Textfärg som ger bra kontrast mot gult
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
    // Här kan du anpassa mer av typografin
  },
  // Lägg till ytterligare anpassningar som breakpoints, shadows, etc.
});

export default theme;
