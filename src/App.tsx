import { ThemeProvider as MaterialTM } from '@mui/material/styles';
import loadable from '@loadable/component';

import muiTheme from './styles/mui-theme';

const TestPage1 = loadable(() => import('./pages/TestPage1'));

export const App = () => {
  return (
    <MaterialTM theme={muiTheme}>
      <TestPage1 />
    </MaterialTM>
  );
};

export { App as default };
