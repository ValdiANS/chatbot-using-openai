import React from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import SettingsProvider from './store/SettingsProvider';

import App from './App';
import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: '"IBM Plex Serif", serif',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
