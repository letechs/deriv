import React, { useReducer } from 'react';
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import { store } from './app/store';


import Test1 from './Test1';
import Home from './pages/Home';
import App3 from './App3';
import App1 from './App1';
import Test from './Test';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App/> 
    </Provider>   
  </React.StrictMode>
);
