import axios from 'axios';
import React from 'react';

class SpotifyService extends React.Component {
  // _accessToken = null;
  // _refreshToken = null;
  // _expiresIn = null;

  _playlist = null;

  get playlist() {
    return this._playlist;
  }

  accessToken = localStorage.getItem('accessToken');
  refreshToken = localStorage.getItem('refreshToken');
  expiresIn = localStorage.getItem('expiresIn');

  async connect(code) {
    return axios
      .post('http://localhost:3001/connect', {
        code,
      })
      .then((res) => {
        let now = new Date();
        console.log(now, 'now');
        let time = now.getTime();
        console.log(time, 'time');

        // this._accessToken = res.data.accessToken; //store in local storage?
        // this._refreshToken = res.data.refreshToken;
        // this._expiresIn = res.data.expiresIn;
        // window.history.pushState({}, null, '/');
        console.log('response', res);

        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        // localStorage.setItem('tokenType', res.data.tokenType);
        localStorage.setItem('expiresIn', res.data.expiresIn);
        let expireTime = time + 3600 * 1000;
        console.log('expireTime', expireTime);
        localStorage.setItem('expireTime', expireTime);
        return true;
      })
      .catch(() => {
        window.location = '/';
        return false;
      });
  }

  async refresh(refreshToken) {
    console.log(refreshToken);
    if (!refreshToken) return;
    console.log('you are in refresh');
    axios
      .post('http://localhost:3001/refresh', {
        refreshToken,
      })
      .then((res) => {
        console.log(res);

        let now = new Date();
        console.log(now, 'now');
        let time = now.getTime();
        console.log(time, 'time');

        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('expiresIn', res.data.expiresIn);
        console.log(
          localStorage.getItem('accessToken'),
          'refresh access tOken'
        );

        let expireTime = time + 3600 * 1000;
        console.log('expireTime', expireTime);
        localStorage.setItem('expireTime', expireTime);
      })
      .catch(() => {
        window.location = '/';
      });

    return localStorage.getItem('refreshToken');
  }

  play(playlist) {
    this._playlist = playlist;
  }
}

export default SpotifyService;
