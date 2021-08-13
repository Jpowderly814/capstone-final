import './Nav.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from '../Auth/Login';
import Home from './Home';
import Profile from '../Auth/Profile';
//import Connect from '../Music/Connect';

import { DropdownButton, Dropdown } from 'react-bootstrap';

function Nav() {
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
        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} exact />
      </Router>
    </div>
  );
}

export default Nav;
