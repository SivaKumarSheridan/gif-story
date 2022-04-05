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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
