import Axios from 'axios';
import React from 'react';

import User from '../Domain/Entities/Types/User';

class UserService extends React.Component {
  _user = null;

  get user() {
    return this._user;
  }

  async register(usernameReg, passwordReg, emailReg) {
    return Axios.post('http://localhost:3001/login/register', {
      username: usernameReg,
      password: passwordReg,
      email: emailReg,
    }).then((response) => {
      console.log(response);
    });
  }

  async login(username, password) {
    return Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        return response;
      } else {
        console.log('login response', response.data.result[0]);
        this._user = new User(response.data.result[0].username);
        console.log(this._user);
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('username', response.data.result[0].username);
        localStorage.setItem('expiresIn', response.data.token.expires);
        localStorage.setItem('userId', response.data.result[0].id);
        console.log(localStorage.getItem('username'));
        return response;
      }
    });
  }

  async logout() {
    return Axios.post('http://localhost:3001/logout', {}).then((response) => {
      if (response.data.message) {
        return response;
      } else {
        localStorage.setItem('userToken', null);
        localStorage.setItem('username', null);
        localStorage.setItem('userId', null);
        console.log(localStorage.getItem('userToken'));
        return response;
      }
    });
  }
}

export default UserService;
