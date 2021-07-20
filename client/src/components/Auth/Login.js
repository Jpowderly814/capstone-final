import './Login.css';
import Register from './Register';
import { useState, useContext } from 'react';
import { UserContext } from '../..';
import Axios from 'axios';
import ErrorModal from '../UI/ErrorModal';
//import { Link, Route } from 'react-router-dom';

function Login() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') !== 'null'
  );
  const userService = useContext(UserContext);
  Axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {};

  const startRegistrationHandler = () => {
    setIsRegistering(true);
  };

  const stopRegistrationHandler = () => {
    setIsRegistering(false);
  };

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoggedIn(false);
        setError({
          title: 'Invalid',
          message: response.data.message,
        });
        return;
      } else {
        console.log(response.data.result[0]);
        // Get rid of local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expiresIn', response.data.token.expires);
        localStorage.setItem('user', response.data.result[0].id);
        console.log(localStorage.getItem('user'));

        setLoggedIn(true);
      }
    });

    setUsername('');
    setPassword('');
  };

  const logout = () => {
    Axios.post('http://localhost:3001/logout', {}).then((response) => {
      if (response.data.message) {
        setLoggedIn(true);

        setError({
          title: 'Invalid',
          message: response.data.message,
        });
        return;
      } else {
        console.log();
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('user'));

        //setLoginStatus(response.data[0].RowDataPacket.username);
        setLoggedIn(true);
      }
    });
    setLoggedIn(false);
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
    setUsername('');
    setPassword('');
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className="login-register-container">
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <div className="text-center">
        <h2 className="login-register-header">Sign in</h2>
      </div>

      <div className="login-register-form">
        {localStorage.getItem('token') === 'null' && (
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Username</label>
            <div className="col-sm-9">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        {localStorage.getItem('token') === 'null' && (
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
        )}

        {localStorage.getItem('token') !== 'null' && (
          <button className="login-btn" onClick={logout}>
            logout
          </button>
        )}
        {localStorage.getItem('token') === 'null' && (
          <button className="login-btn" onClick={login}>
            login
          </button>
        )}
      </div>
      <div>
        {!isRegistering && (
          <button className="login-btn" onClick={startRegistrationHandler}>
            register
          </button>
        )}

        {isRegistering && <Register onCancel={stopRegistrationHandler} />}
      </div>
    </div>
  );
}

export default Login;
