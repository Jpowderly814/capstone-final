import { useState, React } from 'react';
import Axios from 'axios';

class UserService {
  login() {
    return 'You have logged in';
  }

  /* login(username, password) {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        return;
      } else {
        console.log(response.data.result[0]);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expiresIn', response.data.token.expires);
        localStorage.setItem('user', response.data.result[0].id);
        console.log(localStorage.getItem('user'));
      }
    });
  }*/

  logout() {}

  register() {}
}

export default UserService;
