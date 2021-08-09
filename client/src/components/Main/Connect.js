import { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SpotifyService from '../../Services/SpotifyService';
import { SpotifyContext } from '../..';
import { Redirect } from 'react-router-dom';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=5cd4002b7b2647d4837327d4413300db&response_type=code&redirect_uri=http://localhost:3000/connect&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

export default function Connect() {
  const [isConnected, setIsConnected] = useState(false);

  const spotifyService = useContext(SpotifyContext);

  const code = new URLSearchParams(window.location.search).get('code');
  console.log('urlsearchparams', code);

  if (code !== null) {
    spotifyService.connect(code).then((connected) => {
      console.log('connected in connect.js', connected);
      setIsConnected(connected);
    });
  }
  console.log('you are in connect');

  //   // const connect = async () => {
  //   //   window.location = AUTH_URL;
  //   // };

  //   const getReturnedParamsFromSpotifyAuth = (hash) => {
  //     const stringAfterHashtag = hash.substring(1);
  //     const paramsInUrl = stringAfterHashtag.split('&');
  //     const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
  //       console.log(currentValue);
  //       const [key, value] = currentValue.split('=');
  //       accumulater[key] = value;
  //       return accumulater;
  //     }, {});

  //     return paramsSplitUp;
  //   };

  //   useEffect(() => {
  //     if (window.location.hash) {
  //       const code = getReturnedParamsFromSpotifyAuth(window.location.hash);
  //       console.log(code);
  //       localStorage.clear();

  //       // localStorage.setItem('accessToken', access_token);
  //       // localStorage.setItem('tokenType', token_type);
  //       // localStorage.setItem('expiresIn', expires_in);
  //     }
  //   }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      {isConnected && <Redirect to="/" />}
      {/* <a target="_blank" className="btn btn-success btn-lg" href={AUTH_URL}>
        Connect to Spotify
      </a> */}
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Connect to Spotify
      </a>
    </Container>
  );
}
