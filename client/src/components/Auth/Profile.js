import { useState, useEffect, useContext } from 'react';
import Card from '../UI/Card';
import classes from './Profile.module.css';
import axios from 'axios';
// import { UserContext } from '../..';
import logo from './music-notes.png';

const Profile = () => {
  const userId = localStorage.getItem('user');
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/favorites/${userId}`).then((response) => {
      setFavoritesList(response.data);
    });
  });

  const removeFavorite = (id) => {
    axios.delete(`http://localhost:3001/favorites/delete/${id}`).then(() => {
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
      <div className={classes.outer}>
        <div className={classes.header}>
          <img src={logo} alt="" width="100" height="100" />
          <h1>Welcome Julie</h1>
        </div>

        {/* <div>
          Icons made by{' '}
          <a
            href="https://www.flaticon.com/authors/icongeek26"
            title="Icongeek26"
          >
            Icongeek26
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div> */}

        <Card className={classes.users}>
          <h1>Favorite Playlists</h1>

          {favoritesList.length === 0 && (
            <p>You have not saved any favorites yet!</p>
          )}

          <ul>
            {favoritesList.map((favorite) => (
              <li key={favorite.id}>
                {favorite.name}
                <button
                  className={classes.button}
                  onClick={() => {
                    removeFavorite(favorite.id);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
