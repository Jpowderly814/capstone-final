import { useState, useEffect, useContext } from 'react';
import Player from './Player';
import { SpotifyContext } from '../..';
import PlaylistSearchResult from './PlaylistSearchResult';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import AverageRating from './AverageRating';
import Card from '../UI/Card';
import RatePlaylist from './RatePlaylist';
import Button from '../UI/Button';
import axios from 'axios';
import './Dashboard.css';
import { Redirect } from 'react-router-dom';

const spotifyApi = new SpotifyWebApi({
  clientId: '8b945ef10ea24755b83ac50cede405a0',
});

export default function Dashboard() {
  const spotifyService = useContext(SpotifyContext);
  console.log(spotifyService.playlist);

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken')
  );
  const [expiresIn, setExpiresIn] = useState(localStorage.getItem('expiresIn'));

  axios.defaults.withCredentials = true;

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingPlaylist, setPlayingPlaylist] = useState(
    spotifyService.playlist ? spotifyService.playlist : ''
  );
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isRating, setIsRating] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  const startRatingHandler = () => {
    setIsRating(true);
  };
  const stopRatingHandler = () => {
    setIsRating(false);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    let now = new Date();
    let currentTime = now.getTime();
    let expireTime = parseInt(localStorage.getItem('expireTime'), 10);
    if (currentTime < expireTime) {
      console.log('time remaining: ', expireTime - currentTime);
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (!spotifyService.playlist) return;
    if (!accessToken) return;
    const playlistUri = spotifyService.playlist.uri.substring(17);
    spotifyApi.getPlaylistTracks(playlistUri).then((res) => {
      console.log(res.body);

      setPlaylistTracks(
        res.body.items.map((track) => {
          const smallestAlbumImage = track.track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            }
          );

          return {
            title: track.track.name,
            albumUrl: smallestAlbumImage.url,
            id: track.track.id,
            uri: track.track.uri,
          };
        })
      );
    });
    spotifyService.clear();
    console.log(spotifyService.playlist);
  }, [spotifyService, accessToken]);

  function choosePlaylist(playlist) {
    console.log(playlist);
    const playlistUri = playlist.uri.substring(17);
    spotifyApi.getPlaylistTracks(playlistUri).then((res) => {
      console.log(res.body);

      setPlaylistTracks(
        res.body.items.map((track) => {
          const smallestAlbumImage = track.track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            }
          );

          return {
            title: track.track.name,
            albumUrl: smallestAlbumImage.url,
            id: track.track.id,
            uri: track.track.uri,
          };
        })
      );
    });

    setPlayingPlaylist(playlist);
    console.log('playing playlist', playingPlaylist);
    setSearch('');
  }

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchPlaylists(search + ' bpm').then((res) => {
      console.log(res.body);
      if (cancel) return;
      setSearchResults(
        res.body['playlists'].items.map((playlist) => {
          const smallestAlbumImage = playlist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            playlist.images[0]
          );

          return {
            title: playlist.name,
            uri: playlist.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchPlaylists(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body['playlists'].items.map((playlist) => {
          const smallestAlbumImage = playlist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;

              return smallest;
            },
            playlist.images[0]
          );

          return {
            title: playlist.name,
            uri: playlist.uri,
            albumUrl: smallestAlbumImage
              ? smallestAlbumImage.url
              : 'https://mosaic.scdn.co/60/ab67616d0000b2730a4ae12e…f06224338ab67616d0000b273e01d7d558032457b0e4883f6', //fix this to put in generic icon or something
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  const savePlaylist = () => {
    console.log(playingPlaylist);
    axios
      .post('http://localhost:3001/save', {
        playlist: playingPlaylist.uri.substring(17),
        name: playingPlaylist.title,
        user: localStorage.getItem('userId'),
        albumUrl: playingPlaylist.albumUrl,
      })
      .then((response) => {
        console.log('Success!');
      });
  };

  return (
    <Container>
      {!isConnected && <Redirect to="/connect" />}
      <div className="title-bar" data-testid="dashboardHeader">
        <h2>Search Playlists</h2>
        {/* Move this into another componenent */}
        <Container className="d-flex flex-row py-2" style={{ width: '75vh' }}>
          <Form.Control
            as="select"
            type="search"
            placeholder="Search Playlists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            <option value="">Select a tempo</option>
            <option value="180">180 BPM</option>
            <option value="170">170 BPM</option>
            <option value="160">160 BPM</option>
            <option value="150">150 BPM</option>
          </Form.Control>
          <p>OR</p>
          <Form.Control
            as="select"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            <option value="">Select a workout</option>
            <option value="run">Running</option>
            <option value="lift">Weight-lifting</option>
            <option value="cycling">Biking</option>
            <option value="yoga">Yoga</option>
          </Form.Control>
        </Container>
      </div>

      <div className="flex-grow-1 my-2">
        {searchResults.map((playlist) => (
          <PlaylistSearchResult
            playlist={playlist}
            title={playlist.title}
            key={playlist.uri}
            choosePlaylist={choosePlaylist}
          />
        ))}
        {searchResults.length === 0 && (
          <div>
            <Card className="playlist-header">
              {playingPlaylist && (
                <div className="card-sub">
                  <div className="header-title">
                    {playingPlaylist?.title}
                    <AverageRating playlist={playingPlaylist?.uri} />
                  </div>

                  <Button onClick={savePlaylist}>Save Playlist</Button>

                  <div>
                    {!isRating && (
                      <Button onClick={startRatingHandler}>
                        Rate Playlist
                      </Button>
                    )}

                    {isRating && (
                      <RatePlaylist
                        playlist={playingPlaylist?.uri}
                        onCancel={stopRatingHandler}
                      />
                    )}
                  </div>
                </div>
              )}
            </Card>

            <Player
              accessToken={accessToken}
              trackUri={playingPlaylist?.uri}
              trackList={playlistTracks}
            />
          </div>
        )}
      </div>
    </Container>
  );
}
