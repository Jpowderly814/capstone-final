import { useState, useEffect } from 'react';
import FavoritesList from './FavoritesList';
import Card from '../UI/Card';
import classes from './Profile.module.css';
import Button from '../UI/Button';

const axios = require('axios');

const Profile = () => {
  const userId = localStorage.getItem('user');
  const [favoritesList, setFavoritesList] = useState([]);

  if (favoritesList.length === 0) {
    axios.get(`http://localhost:3001/favorites/${userId}`).then((response) => {
      setFavoritesList(response.data);
    });
  }

  return (
    <div className={classes.wrapper}>
      <Card className={classes.users}>
        <h1>User</h1>
        <p>{localStorage.getItem('user')}</p>
      </Card>
      <Card className={classes.users}>
        <h1>Favorite Playlists</h1>
        <ul>
          {favoritesList.map((favorite) => (
            <li key={favorite.id}>
              {favorite.name} <Button>Remove</Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Profile;
