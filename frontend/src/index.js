// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-circular-progressbar/dist/styles.css";
// import { ToastContainer } from 'react-toastify';
import * as serviceWorker from "./serviceWorker";
import AttendanceContextProvider from "./Context/AttendanceContext/AttendanceContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AttendanceContextProvider>
      <App />
    </AttendanceContextProvider>
    {/* <ToastContainer autoClose={1000} style={{scale:'.7'}} position="top-right" /> */}
  </React.StrictMode>
);

serviceWorker.unregister();
