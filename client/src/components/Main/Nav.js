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
import './Nav.css';

import { DropdownButton, Dropdown } from 'react-bootstrap';

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') !== 'null'
  );

  // const isLoggedIn = false;

  // const currentUser = localStorage.getItem("user");
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
        <Route path="/login" component={Login} exact />
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/profile">
          {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
        </Route>

        {console.log(isLoggedIn)}
      </Router>
    </div>
  );
}

export default Nav;
