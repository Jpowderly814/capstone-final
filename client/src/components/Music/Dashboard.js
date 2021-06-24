import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import Player from './Player';
//import TrackSearchResult from "./TrackSearchResult"
import PlaylistSearchResult from './PlaylistSearchResult';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
//import axios from "axios"
import TrackList from './TrackList';
import Card from '../UI/Card';
import RatePlaylist from './RatePlaylist';
import Button from '../UI/Button';
import axios from 'axios';
import './Dashboard.css';

const spotifyApi = new SpotifyWebApi({
  clientId: '8b945ef10ea24755b83ac50cede405a0',
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingPlaylist, setPlayingPlaylist] = useState();
  const [tracks, setTracks] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function choosePlaylist(playlist) {
    console.log(playlist);
    const playlistCode = playlist.uri.substring(17);
    spotifyApi.getPlaylistTracks(playlistCode).then((res) => {
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

      //console.log(res.body.items["track"].track.name);
    });
    //artist: track.artists[0].name,

    setPlayingPlaylist(playlist);
    setSearch('');
    setTracks('');
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
            //artist: track.artists[0].name,
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
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchPlaylists(search + ' bpm').then((res) => {
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
            //artist: track.artists[0].name,
            title: playlist.name,
            uri: playlist.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  const savePlaylist = () => {
    console.log(localStorage.getItem('user'));

    console.log(playingPlaylist);
    axios
      .post('http://localhost:3001/save', {
        playlist: playingPlaylist.uri.substring(17),
        name: playingPlaylist.title,
        user: localStorage.getItem('user'),
      })
      .then((response) => {
        console.log('Success!');
      });
  };

  return (
    <Container className="d-flex flex-column py-2" style={{ height: '100vh' }}>
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
            <Card>
              <div>
                {' '}
                {playingPlaylist && (
                  <div>
                    {playingPlaylist?.title}
                    <RatePlaylist playlist={playingPlaylist?.uri} />
                  </div>
                )}{' '}
              </div>
              <div>
                {' '}
                {playingPlaylist && (
                  <Button onClick={savePlaylist}>Save Playlist</Button>
                )}
              </div>
            </Card>
            <div>
              {playingPlaylist && <TrackList trackList={playlistTracks} />}
            </div>
          </div>
        )}
      </div>
      <div>
        <Player
          accessToken={accessToken}
          trackUri={playingPlaylist?.uri}
          trackList={playlistTracks}
        />
      </div>
    </Container>
  );
}
