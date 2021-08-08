import axios from 'axios';
import React from 'react';

class SpotifyService extends React.Component {
  // _accessToken = null;
  // _refreshToken = null;
  // _expiresIn = null;

  accessToken = localStorage.getItem('accessToken');
  refreshToken = localStorage.getItem('refreshToken');
  expiresIn = localStorage.getItem('expiresIn');

  async connect(code) {
    axios
      .post('http://localhost:3001/connect', {
        code,
      })
      .then((res) => {
        // this._accessToken = res.data.accessToken; //store in local storage?
        // this._refreshToken = res.data.refreshToken;
        // this._expiresIn = res.data.expiresIn;
        // window.history.pushState({}, null, '/');
        console.log(res);

        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('tokenType', res.data.tokenType);
        localStorage.setItem('expiresIn', res.data.expiresIn);
      });
    // .catch(() => {
    //   window.location = '/';
    // });
  }

  async refresh() {
    if (!this.refreshToken || !this.expiresIn) return;
    const refreshToken = localStorage.getItem('refreshToken');
    axios
      .post('http://localhost:3001/refresh', {
        refreshToken,
      })
      .then((res) => {
        localStorage.clear();
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('tokenType', res.data.tokenType);
        localStorage.setItem('expiresIn', res.data.expiresIn);
      })
      .catch(() => {
        window.location = '/';
      });

    return localStorage.getItem('refreshToken');
  }
}

export default SpotifyService;
