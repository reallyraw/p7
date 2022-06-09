import Lato2 from '../assets/fonts/Lato-Regular.woff2';
import Lato from '../assets/fonts/Lato-Regular.woff';
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FD2D01',
      contrastText: 'white',
    },
    secondary: {
      light: '#0066ff',
      main: '#FFD7D7',
      contrastText: 'black',
    },
    tertiary: defaultTheme.palette.augmentColor({
        color: { main: '#4E5166' },
        name: "tertiary"
    }),
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Lato',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: 
      `@font-face {
        font-family: 'Lato';
        src: url('${Lato2}') format('woff2'),
            url('${Lato}') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }`,
    },
  },
});
