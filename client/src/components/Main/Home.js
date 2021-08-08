import React, { useContext, useEffect } from 'react';
import './Home.css';
import Axios from 'axios';
import Connect from './Connect';
import Dashboard from '../Music/Dashboard';
import { UserContext } from '../..';

// const code = new URLSearchParams(window.location.search).get('code');
console.log('home access Token', localStorage.getItem('accessToken'));
const code = localStorage.getItem('accessToken');
const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=5cd4002b7b2647d4837327d4413300db&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

// const YOUR_APP_ID = '5d4ca9b8';
// const YOUR_APP_KEY = '3aa8a0b147eb04cceb58d8f3bbb29ba1';
// var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;

function Home() {
  console.log('code', code);
  console.log('expiresIn', localStorage.getItem('expiresIn'));
  const userService = useContext(UserContext);
  console.log('user', userService.user?.username);

  // Axios.defaults.withCredentials = true;

  // const getReturnedParamsFromSpotifyAuth = (hash) => {
  //   const stringAfterHashtag = hash.substring(1);
  //   const paramsInUrl = stringAfterHashtag.split('&');
  //   const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
  //     console.log(currentValue);
  //     const [key, value] = currentValue.split('=');
  //     accumulater[key] = value;
  //     return accumulater;
  //   }, {});

  //   return paramsSplitUp;
  // };

  // useEffect(() => {
  //   if (window.location.hash) {
  //     const { access_token, expires_in, token_type } =
  //       getReturnedParamsFromSpotifyAuth(window.location.hash);

  //     localStorage.clear();

  //     localStorage.setItem('accessToken', access_token);
  //     localStorage.setItem('tokenType', token_type);
  //     localStorage.setItem('expiresIn', expires_in);
  //   }
  // }, []);

  const connect = async () => {
    window.location = AUTH_URL;
    if (window.location.hash) {
      console.log(window.location.hash);
    }
  };

  return (
    <div>
      {/* {code ? <Dashboard /> : <button onClick={connect}>connect</button>} */}
      <Dashboard />
    </div>
  );
}

export default Home;
