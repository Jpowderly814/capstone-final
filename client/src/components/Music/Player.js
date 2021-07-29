import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import TrackList from './TrackList';

export default function Player({
  accessToken,
  trackUri: playlistUri,
  trackList,
}) {
  const [play, setPlay] = useState(false);
  const [trackPlaying, setTrackPlaying] = useState('');

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
    console.log('select this track');
    setTrackPlaying(newArray[0]); //reorder array slice beginning at chosen track and then put state variable in uris
  };

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
      <TrackList trackList={trackList} selectTrack={selectTrack} />
    </div>
  );
}
