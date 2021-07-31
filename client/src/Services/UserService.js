import Axios from 'axios';
import React from 'react';

import User from '../Domain/Entities/Types/User';

class UserService extends React.Component {
  _user = null; // potato - i could not get this to set values in login with the private setting - how to fix this?

  get user() {
    return this._user;
  }

  // get user() {
  //   return this.user;
  // }

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
        // console.log(this.person);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expiresIn', response.data.token.expires);
        localStorage.setItem('user', response.data.result[0].id);
        // console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('user'));
        return response;
      }
    });
  }

  async logout() {
    return Axios.post('http://localhost:3001/logout', {}).then((response) => {
      if (response.data.message) {
        return response;
      } else {
        localStorage.setItem('token', 'null');
        localStorage.setItem('user', 'null');
        console.log(localStorage.getItem('token'));
        console.log('local storage user', localStorage.getItem('user'));
        return response;
      }
    });
  }
}

export default UserService;
