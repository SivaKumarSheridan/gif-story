import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import * as _redux from "./redux";
import axios from "axios";
import store, { persistor } from "./redux/store";
import { GifStorySplashScreenProvider } from './app/GifStorySplashScreen';

const { PUBLIC_URL } = process.env;
_redux.mockAxios(axios);
_redux.setupAxios(axios, store);

ReactDOM.render(
  <React.StrictMode>
    <GifStorySplashScreenProvider>
    <App
     store={store}
     persistor={persistor}
     basename={PUBLIC_URL}
    />
    </GifStorySplashScreenProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
