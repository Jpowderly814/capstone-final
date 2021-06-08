import './Nav.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from '../Auth/Login';
import Home from './Home';
//import Connect from '../Music/Connect';
import A from '../Music/A';

function Nav() {
  return(
      <div className="header">
          <Router>
            <nav>
                <Link to="/">
                    <h3>Home</h3>
                </Link>
                
                <ul className ="nav-links">
                    <Link to='/login'>
                        login
                    </Link>
                    <Link to='/connect'>
                        music
                    </Link>
            
                </ul>

    </nav>
   
    
    <Route path="/" component={Home} exact />
    <Route path="/login" component={Login} exact />
    <Route path="/connect" component={A} exact />
    
    </Router>
    </div>
    
 
  );
}

export default Nav;