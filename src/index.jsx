import './warningFilter';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MoralisDappProvider } from './providers/MoralisDappProvider/MoralisDappProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { MoralisProvider } from 'react-moralis';

const APP_ID = import.meta.env.VITE_MORALIS_APP_ID || '';
const SERVER_URL = import.meta.env.VITE_MORALIS_SERVER_URL || '';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#081311', paper: '#0D1B18' },
    primary:    { main: '#D7B56D' },
    secondary:  { main: '#70B58B' },
    success:    { main: '#70B58B' },
    error:      { main: '#FF4444' },
    text:       { primary: '#F5F1E7', secondary: '#A89E8A' },
    divider:    'rgba(215,181,109,0.12)',
  },
  typography: {
    fontFamily: "Manrope, sans-serif",
  },
  shape: { borderRadius: 0 },
  components: {
    MuiCssBaseline: { styleOverrides: '' },
    MuiButton: {
      styleOverrides: {
        root: { fontFamily: "Manrope, sans-serif", fontWeight: 700, textTransform: 'none', borderRadius: 999 },
      },
    },
  },
});

const getLibrary = (provider) => {
  const lib = new ethers.providers.Web3Provider(provider);
  lib.pollingInterval = 12000;
  return lib;
};

const Application = () => (
  <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL} initializeOnMount={!!(APP_ID && SERVER_URL)}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MoralisDappProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App/>
        </ThemeProvider>
      </MoralisDappProvider>
    </Web3ReactProvider>
  </MoralisProvider>
);

ReactDOM.render(<Application/>, document.getElementById('root'));
