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

  // accessToken = localStorage.getItem('accessToken');
  // refreshToken = localStorage.getItem('refreshToken');
  // expiresIn = localStorage.getItem('expiresIn');

  play(playlist) {
    this._playlist = playlist;
  }

  clear() {
    this._playlist = null;
  }

  async connect(code) {
    return axios
      .post('http://localhost:3001/connect', {
        code,
      })
      .then((res) => {
        let now = new Date();
        let time = now.getTime();
        let expireTime = time + 3600 * 1000;
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('expiresIn', res.data.expiresIn);
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
    axios
      .post('http://localhost:3001/refresh', {
        refreshToken,
      })
      .then((res) => {
        console.log(res);
        let now = new Date();
        let time = now.getTime();
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('expiresIn', res.data.expiresIn);
        let expireTime = time + 3600 * 1000;
        localStorage.setItem('expireTime', expireTime);
      })
      .catch(() => {
        window.location = '/';
      });

    return localStorage.getItem('refreshToken');
  }
}

export default SpotifyService;
