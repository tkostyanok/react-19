import { createTheme } from '@mui/material/styles';

import { BLUE_900, LIGHT_BLUE_600, WHITE } from 'src/constants/colors';


const muiTheme = createTheme({
  palette: {
    primary: {
      main: BLUE_900,
      contrastText: WHITE,
    },
    secondary: {
      main: LIGHT_BLUE_600,
      contrastText: WHITE,
    },
  },
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
  },
});

export default muiTheme;
