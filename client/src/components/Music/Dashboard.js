import { useState, useEffect } from 'react';
import useAuth from './UseAuth';
import Player from './Player';

import PlaylistSearchResult from './PlaylistSearchResult';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';

import Card from '../UI/Card';
import RatePlaylist from './RatePlaylist';
import Button from '../UI/Button';
import axios from 'axios';
import './Dashboard.css';

const spotifyApi = new SpotifyWebApi({
  clientId: '8b945ef10ea24755b83ac50cede405a0',
});

export default function Dashboard({ code }) {
  console.log('nav');
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingPlaylist, setPlayingPlaylist] = useState('');
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
    });

    setPlayingPlaylist(playlist);
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
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

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
    <Container>
      <div>
        <h2>Search Playlists</h2>

        <Form.Label>Label</Form.Label>
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
                    <RatePlaylist playlist={playingPlaylist?.uri} />
                  </div>

                  <Button onClick={savePlaylist}>Save Playlist</Button>
                  <Button onClick={savePlaylist}>Rate</Button>
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
