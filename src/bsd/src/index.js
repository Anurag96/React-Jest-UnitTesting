import * as React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import {KeyClockContextProvider} from "./hooks/useAuthContext"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <KeyClockContextProvider>
          <App />
        </KeyClockContextProvider>
      </BrowserRouter>
    </Provider>
  </>
);
