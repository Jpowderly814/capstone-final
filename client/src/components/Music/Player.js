import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import TrackList from './TrackList';

export default function Player({
  accessToken,
  trackUri: playlistUri,
  trackList,
}) {
  const [play, setPlay] = useState(false);
  const [trackPlaying, setTrackPlaying] = useState([]);

  useEffect(() => setPlay(true), [playlistUri]);

  useEffect(() => {
    setTrackPlaying(playlistUri);
  }, [playlistUri]);

  let songArray = [];

  for (let i = 0; i < trackList.length; i++) {
    songArray.push(trackList[i].uri);
  }

  if (!accessToken) return null;

  const selectTrack = (trackNumber, trackUri) => {
    let newSongArray = songArray.slice(trackNumber);
    setTrackPlaying(newSongArray); //reorder array slice beginning at chosen track and then put state variable in uris
  };

  return (
    <div>
      <SpotifyPlayer
        token={accessToken}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackPlaying ? trackPlaying : []}
        // uris={playlistUri ? newArray : []}
        // uris={[newArray]}
      />
      <TrackList trackList={trackList} selectTrack={selectTrack} />
    </div>
  );
}
