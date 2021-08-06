import Axios from 'axios';
import React from 'react';

class SpotifyService extends React.Component {

    _accessToken = null;
    _refreshToken = null;
    _expiresIn = null;
  
    async connect(code) {
      axios
        .post('http://localhost:3001/connect', {
          code,
        })
        .then((res) => {
          this._accessToken = res.data.accessToken;
          this._refreshToken = res.data.refreshToken;
          this.expiresIn = res.data.expiresIn;
          // window.history.pushState({}, null, '/');
        })
        .catch(() => {
          window.location = '/';
        });
      }
  
    async refresh(refreshToken) {
      if (!this._refreshToken || !this._expiresIn) return;
      const interval = setInterval(() => {
        axios
          .post('http://localhost:3001/refresh', {
            refreshToken,
          })
          .then((res) => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
          })
          .catch(() => {
            window.location = '/';
          });
      }, (expiresIn - 60) * 1000);
  
      return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);
  
    return accessToken;
  }
}

export default SpotifyService;
