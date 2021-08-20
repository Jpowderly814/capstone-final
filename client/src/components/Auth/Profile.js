import { useState, useEffect, useContext } from 'react';
import Card from '../UI/Card';
import classes from './Profile.module.css';
import axios from 'axios';
import { UserContext } from '../..';
import { Redirect } from 'react-router-dom';
import logo from './music-notes.png';
import SpotifyService from '../../Services/SpotifyService';
import { SpotifyContext } from '../..';

const Profile = () => {
  const userId = localStorage.getItem('userId');
  const [favoritesList, setFavoritesList] = useState([]);
  const [playFavorite, setPlayFavorite] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const userService = useContext(UserContext);
  console.log('username:', userService._user?.username);

  const spotifyService = useContext(SpotifyContext);

  console.log(favoritesList);

  useEffect(() => {
    axios.get(`http://localhost:3001/favorites/${userId}`).then((response) => {
      setFavoritesList(response.data);
      console.log(favoritesList);
    });
  }, [userId]);

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

  const handlePlayFavorite = (id) => {
    spotifyService.play({
      title: '170 BPM cadence run',
      uri: 'spotify:playlist:7piEfGgVIxFploRDjeS2Fa',
      albumUrl:
        'https://mosaic.scdn.co/60/ab67616d0000b2730376bdff…31170a418ab67616d0000b2739bbd79106e510d13a9a5ec33',
    });
    setPlayFavorite(true);
    setFavorite(id);
    console.log(spotifyService._playlist);
  };

  return (
    <div className={classes.wrapper}>
      {console.log('choose favorite', favorite)}
      {playFavorite && <Redirect to={'/'} />}
      <div className={classes.outer}>
        <div className={classes.header}>
          <img src={logo} alt="" width="100" height="100" />
          <h1>Welcome {localStorage.getItem('username')}</h1>
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
          <h1 className={classes.title}>Favorite Playlists</h1>

          {favoritesList.length === 0 && (
            <p>You have not saved any favorites yet!</p>
          )}

          <ul>
            {favoritesList.map((favorite) => (
              <li key={favorite.id}>
                <img
                  className="track-image"
                  src={favorite.albumUrl}
                  alt=""
                  style={{ height: '64px', width: '64px' }}
                />
                {favorite.name}
                <button
                  className={classes.button}
                  onClick={() => {
                    removeFavorite(favorite.id);
                  }}
                >
                  Remove
                </button>
                <button
                  className={classes.button}
                  onClick={() => {
                    handlePlayFavorite(favorite.playlist);
                  }}
                >
                  Play
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
