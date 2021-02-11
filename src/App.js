import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { UserContext } from './context/UserContext';

const App = () => {
  const { authenticated } = useContext(UserContext);
  const routing = useRoutes(routes(authenticated));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
