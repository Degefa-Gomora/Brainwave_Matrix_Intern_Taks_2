// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import AuthContextProvider from './Context/AuthContext'

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthContextProvider>
//        <App />
//     </AuthContextProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./Context/AuthContext";
import { ThemeProvider } from "./Context/ThemeContext";
import "./Css/Theme.css"; 

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);