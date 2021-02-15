import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import * as serviceWorker from './serviceWorker';
import App from './App';
import UserContextProvider from './context/UserContext';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 7000,
  offset: '30px',
  transition: transitions.SCALE
};

ReactDOM.render((
  <UserContextProvider>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </UserContextProvider>
), document.getElementById('root'));

serviceWorker.unregister();
