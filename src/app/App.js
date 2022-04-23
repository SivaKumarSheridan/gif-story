
import './App.css';
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
import { PersistGate } from "redux-persist/integration/react";
import { LayoutSplashScreen } from './GifStorySplashScreen';
import {IntlProvider} from "react-intl";
import { Header } from './modules/pages/header/Header';
import { Footer } from './modules/pages/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
                {/* Render routes with provided `Layout`. */}
                <IntlProvider locale="en">
                  <Header/>
                <Routes />
                <Footer/>
                </IntlProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}

