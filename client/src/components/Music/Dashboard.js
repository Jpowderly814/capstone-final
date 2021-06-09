import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
//import TrackSearchResult from "./TrackSearchResult"
import PlaylistSearchResult from "./PlaylistSearchResult";
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
//import axios from "axios"
import TrackList from "./TrackList";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingPlaylist, setPlayingPlaylist] = useState()
  const [tracks, setTracks] = useState("")
  const [playlistTracks, setPlaylistTracks] = useState([]);

  
  function choosePlaylist(playlist) {
    const playlistCode=playlist.uri.substring(17);
    spotifyApi.getPlaylistTracks(playlistCode)
      .then(res => {
        console.log(res.body);
        setPlaylistTracks(res.body.items.map(track => {
          return {
            title: track.track.name
          }
        }));

        //console.log(res.body.items["track"].track.name);
      });
        //artist: track.artists[0].name,
        
    setPlayingPlaylist(playlist);
    setSearch("");
    setTracks("");
    }

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchPlaylists(search + " bpm").then(res => {
      console.log(res.body);
      if (cancel) return
      setSearchResults(
        
        res.body["playlists"].items.map(playlist => {
          const smallestAlbumImage = playlist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            playlist.images[0]
          )

          return {
            //artist: track.artists[0].name,
            title: playlist.name,
            uri: playlist.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])
  


  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchPlaylists(search + " bpm").then(res => {
      
      if (cancel) return
      setSearchResults(
        res.body["playlists"].items.map(playlist => {
          const smallestAlbumImage = playlist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            playlist.images[0]
          )

          return {
            //artist: track.artists[0].name,
            title: playlist.name,
            uri: playlist.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])


  //const [name, setName] = useState("");
  //const [user, setUser] = useState("");

  const savePlaylist = () => {
    console.log(playingPlaylist);
      axios.post("http://localhost:3001/save", {
        id: playingPlaylist.uri.substring(17),
        name: playingPlaylist.title,
        user: 'Julie'
      }).then((response) => {
        console.log("Success!");  
        });
      
      //setUser("");
      //setName("");
  };


  return (

    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search} 
        onChange={e => setSearch(e.target.value)}
      />

<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(playlist => (
          <PlaylistSearchResult
            playlist={playlist}
            key={playlist.uri}
            choosePlaylist={choosePlaylist}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            <div> {playingPlaylist && <button onClick={savePlaylist}>Save Playlist</button>}</div>
            <div>{playingPlaylist && <TrackList trackList={playlistTracks}  />}</div>
          </div>
          )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingPlaylist?.uri} />
      </div>
      </Container>

  )
}
