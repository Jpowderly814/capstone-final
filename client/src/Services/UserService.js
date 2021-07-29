import Axios from 'axios';

class UserService {
  #_user = null;
  get user() {
    return this.#_user;
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
        console.log(response.data.result[0]);

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
        console.log(localStorage.getItem('user'));
        return response;
      }
    });
  }
}

export default UserService;
