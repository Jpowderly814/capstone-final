import { useState, useEffect, useContext } from 'react';
import Card from '../UI/Card';
import classes from './Profile.module.css';
import axios from 'axios';
import { UserContext } from '../..';

const Profile = () => {
  const userService = useContext(UserContext);

  console.log(userService.login());

  const userId = localStorage.getItem('user');
  const [favoritesList, setFavoritesList] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  const getFavorites = (userId) => {
    if (isEditing === true) {
      console.log('im here');
      axios
        .get(`http://localhost:3001/favorites/${userId}`)
        .then((response) => {
          setFavoritesList(response.data);
          setIsEditing(false);
        });
    }
    if (favoritesList.length === 0) {
      return;
    }
  };

  const removeFavorite = (id) => {
    axios
      .delete(`http://localhost:3001/favorites/delete/${id}`)
      .then((response) => {
        console.log(id);
        console.log('Success!');
        setFavoritesList(
          favoritesList.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes.users}>
        <h1>User</h1>
        <p>{localStorage.getItem('user')}</p>
      </Card>
      <Card className={classes.users}>
        <h1>Favorite Playlists</h1>
        {getFavorites(userId)}
        {favoritesList.length === 0 && <p>None</p>}

        <ul>
          {favoritesList.map((favorite) => (
            <li key={favorite.id}>
              {favorite.name}

              <button
                onClick={() => {
                  removeFavorite(favorite.id);
                }}
              >
                Remove {favorite.id}
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Profile;
