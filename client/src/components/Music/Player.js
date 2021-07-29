import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import TrackList from './TrackList';

export default function Player({
  accessToken,
  trackUri: playlistUri,
  trackList,
}) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [playlistUri]);

  let newArray = [];
  console.log(trackList.length);
  console.log(playlistUri);

  for (let i = 0; i < trackList.length; i++) {
    newArray.push(trackList[i].uri);
  }
  console.log(newArray);

  if (!accessToken) return null;


  const selectTrack = () => {

  }


  return (
    <div>
      <SpotifyPlayer
        token={accessToken}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={playlistUri ? [playlistUri] : []}
        // uris={playlistUri ? newArray : []}
        // uris={[newArray]}
      />
      <TrackList trackList={trackList} />
    </div>
  );
}
