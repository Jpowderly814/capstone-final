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
  const [isLoggedIn, setIsLoggedIn] = useState(
    // localStorage.getItem('userToken') !== 'null' &&
    localStorage.getItem('userToken') !== null
  );
  const userService = useContext(UserContext);

  Axios.defaults.withCredentials = true;

  const handleLogin = async () => {
    let response = await userService
      .login(username, password)
      .then((response) => {
        console.log('login.js response', response);
        if (response === true) {
          setIsLoggedIn(true);
        } else if (response.data.message) {
          setError({
            title: 'Invalid',
            message: response.data.message,
          });
        }
      });

    // console.log(user);
    console.log(userService.user);
    setIsLoggedIn(true);
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
    console.log('logout', userService?.user);
    if (response.data.message) {
      setError({
        title: 'Invalid',
        message: response.data.message,
      });
    }
    setIsLoggedIn(false);
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
        {localStorage.getItem('userToken') === 'null' && (
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
        {localStorage.getItem('userToken') === 'null' && (
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

        {localStorage.getItem('userToken') !== 'null' && (
          <div>
            <p> You are logged in {localStorage.getItem('username')}</p>
            <button className="login-btn" onClick={handleLogout}>
              logout
            </button>
          </div>
        )}
        {localStorage.getItem('userToken') === 'null' && (
          <button className="login-btn" onClick={handleLogin}>
            login
          </button>
        )}
      </div>
      {localStorage.getItem('userToken') === 'null' && (
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
