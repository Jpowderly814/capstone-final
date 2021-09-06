import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SpotifyService from './Services/SpotifyService';
import UserService from './Services/UserService';

const userService = new UserService();
const spotifyService = new SpotifyService();
const UserContext = React.createContext(null);
const SpotifyContext = React.createContext(null);

ReactDOM.render(
  <React.StrictMode>
    <UserContext.Provider value={userService}>
      <SpotifyContext.Provider value={spotifyService}>
        <App />
      </SpotifyContext.Provider>
    </UserContext.Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { UserContext, SpotifyContext };
