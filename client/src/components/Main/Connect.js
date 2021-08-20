import { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SpotifyService from '../../Services/SpotifyService';
import { SpotifyContext } from '../..';
import { Redirect } from 'react-router-dom';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=5cd4002b7b2647d4837327d4413300db&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

export default function Connect() {
  let now = new Date();
  let currentTime = now.getTime();
  let expireTime = parseInt(localStorage.getItem('expireTime'), 10);
  console.log(expireTime);

  const [isConnected, setIsConnected] = useState();

  const spotifyService = useContext(SpotifyContext);

  const code = new URLSearchParams(window.location.search).get('code');
  console.log('urlsearchparams', code);

  if (code) {
    spotifyService.connect(code).then((connected) => {
      console.log('connected in connect.js', connected);
      setIsConnected(connected);
      console.log('connected after', connected);
    });
  }
  console.log('you are in connect');

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
