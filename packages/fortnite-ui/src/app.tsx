import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

const App: React.SFC = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
  </MuiThemeProvider>
);

export default App;
