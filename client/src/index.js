import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserService from './Services/UserService';

// user Service class
const userService = new UserService();

const UserContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
    <UserContext.Provider value={userService}>
      <App />
    </UserContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { UserContext };
