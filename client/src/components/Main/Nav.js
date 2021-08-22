import { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from '../Auth/Login';
import Home from './Home';
import Profile from '../Auth/Profile';
import Connect from '../Main/Connect';
import ErrorModal from '../UI/ErrorModal';
import Dashboard from '../Music/Dashboard';
import './Nav.css';

import { DropdownButton, Dropdown } from 'react-bootstrap';
import { isSemicolonClassElement } from 'typescript';
import SpotifyService from '../../Services/SpotifyService';
import { SpotifyContext } from '../..';

function Nav() {
  // const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userToken') !== null &&
      localStorage.getItem('userToken') !== 'null'
  );
  const [isAuthorized, setIsAuthorized] = useState(true);
  console.log(' is logged in', isLoggedIn);
  console.log(localStorage.getItem('accessToken'));
  console.log(localStorage.getItem('refreshToken'));
  console.log(localStorage.getItem('userToken'));

  const spotifyService = useContext(SpotifyContext);

  // const isLoggedIn = false;

  console.log(localStorage.getItem('username'));

  useEffect(() => {
    let now = new Date();
    let currentTime = now.getTime();
    let expireTime = parseInt(localStorage.getItem('expireTime'), 10);
    console.log(expireTime);

    if (currentTime < expireTime) {
      console.log(
        'current time is less than expireTime',
        expireTime - currentTime
      );
      setIsAuthorized(true);
    } else {
      console.log('expireTime - currentTime = ', expireTime - currentTime);
      setIsAuthorized(false);
      localStorage.setItem('expireTime', null);
      console.log(localStorage.getItem('expireTime'), 'expireTime');
      console.log(isAuthorized, 'is Authorized');
      if (isNaN(expireTime)) {
        const refresh = localStorage.getItem('refreshToken');
        console.log(refresh);
        spotifyService.refresh(refresh);
      }
      // spotifyService.refresh(localStorage.getItem('refreshToken'));
    }
  });
  // const errorHandler = () => {
  //   setError(null);
  // };

  return (
    <div>
      <Router>
        <div className="header">
          <nav>
            <Link to="/">
              <div className="home-link">
                <h3>Home</h3>
              </div>
            </Link>

            <div className="account-button">
              <DropdownButton className="dropdown" title="account">
                <Dropdown.Item href="login">login/logout</Dropdown.Item>
                <Dropdown.Item href="profile">profile</Dropdown.Item>
              </DropdownButton>
            </div>
          </nav>
        </div>

        <Route exact path="/login" component={Login} />

        <Route exact path="/connect">
          {isLoggedIn && !isAuthorized ? (
            <Connect />
          ) : !isLoggedIn ? (
            <Redirect to="/login" />
          ) : (
            <Redirect to="/" />
          )}
        </Route>

        <Route exact path="/">
          {isAuthorized && isLoggedIn ? (
            <Dashboard />
          ) : (
            <Redirect to="/connect" />
          )}
        </Route>

        <Route exact path="/profile">
          {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
        </Route>
      </Router>
    </div>
  );
}

export default Nav;
