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
            <Link to="/">Home</Link>

            <Link to="/login">login/logout</Link>

            <Link to="/profile">profile</Link>
          </nav>
        </div>
        <Route path="/login" component={Login} />
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
