import React from 'react';
import axios from 'axios';

const Data = (props) => {
  const playlistId = props.playlist.substring(17);

  const averageRating = (props) => {
    axios.get(`http://localhost:3001/rate/${playlistId}`).then((response) => {
      let average = 0;
      let total = 0;
      for (let i = 0; i < response.data.length; i++) {
        let a = parseInt(response.data[i].rating);
        total = total + a;
      }
      average = total / response.data.length;
      return average;
    });
  };

  return averageRating(playlistId);
};

export default Data;
