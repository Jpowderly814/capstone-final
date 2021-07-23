import './Login.css';
import Register from './Register';
import { useState, useEffect, useContext } from 'react';
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

  const handleLogin = async () => {
    let response = await userService.login(username, password);
    if (response.data.message) {
      setError({
        title: 'Invalid',
        message: response.data.message,
      });
    }
    setLoggedIn(true);
    setUsername('');
    setPassword('');
  };

  const startRegistrationHandler = () => {
    setIsRegistering(true);
  };
  const stopRegistrationHandler = () => {
    setIsRegistering(false);
  };

  const handleLogout = async () => {
    // await userService.logout();
    let response = await userService.logout();
    if (response.data.message) {
      setError({
        title: 'Invalid',
        message: response.data.message,
      });
    }
    setLoggedIn(false);
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
          <button className="login-btn" onClick={handleLogout}>
            logout
          </button>
        )}
        {localStorage.getItem('token') === 'null' && (
          <button className="login-btn" onClick={handleLogin}>
            login
          </button>
        )}
      </div>
      {localStorage.getItem('token') === 'null' && (
        <div>
          {!isRegistering && (
            <button className="login-btn" onClick={startRegistrationHandler}>
              register
            </button>
          )}
          {isRegistering && <Register onCancel={stopRegistrationHandler} />}
        </div>
      )}
    </div>
  );
}
export default Login;
