import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import TrackList from './TrackList';

export default function Player({ accessToken, trackUri, trackList }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  let newArray = [];
  console.log(trackList.length);

  for (let i = 0; i < trackList.length; i++) {
    newArray.push(trackList[i].uri);
  }

  if (!accessToken) return null;
  return (
    <div>
      <SpotifyPlayer
        token={accessToken}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
      <TrackList trackList={trackList} />
    </div>
  );
}
