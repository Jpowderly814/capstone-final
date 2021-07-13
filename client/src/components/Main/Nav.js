import './Nav.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from '../Auth/Login';
import Home from './Home';
import Profile from '../Auth/Profile';
//import Connect from '../Music/Connect';

import { DropdownButton, Dropdown } from 'react-bootstrap';

function Nav() {
  return (
    <div className="header">
      <Router>
        <nav>
          <Link to="/">
            <h3>Home</h3>
          </Link>

          <DropdownButton className="dropdown" title="account">
            <Dropdown.Item href="login">login/logout</Dropdown.Item>
            <Dropdown.Item href="profile">profile</Dropdown.Item>
          </DropdownButton>
        </nav>

        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} exact />
      </Router>
    </div>
  );
}

export default Nav;
