import { useState } from 'react';
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
import './Nav.css';

import { DropdownButton, Dropdown } from 'react-bootstrap';

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') !== null ||
      localStorage.getItem('token') !== 'null'
  );
  console.log(isLoggedIn);
  console.log(localStorage.getItem('accessToken'));

  // const isLoggedIn = false;

  // const currentUser = localStorage.getItem("user");
  return (
    <div>
      <Router>
        <div className="header">
          <nav>
            <Link to="/">Home</Link>

            <Link to="/login">login/logout</Link>

            <Link to="/profile">profile</Link>
            <Link to="/connect">connect</Link>
          </nav>
        </div>
        <Route path="/login" component={Login} />
        <Route path="/connect" component={Connect} />
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/profile">
          {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
        </Route>
      </Router>
    </div>
  );
}

export default Nav;
