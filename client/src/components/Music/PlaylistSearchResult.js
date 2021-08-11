import React from 'react';
import Card from '../UI/Card';
import './PlaylistSearchResult.css';

export default function PlaylistSearchResult({ playlist, choosePlaylist }) {
  function handlePlay() {
    choosePlaylist(playlist);
  }

  return (
    // // <div
    //   //   className="d-flex m-2 align-items-center"
    //   //   style={{ cursor: 'pointer' }}
    //   //   onClick={handlePlay}
    //   // >
    //     {/* <img
    //       src={playlist.albumUrl}
    //       alt=""
    //       style={{ height: '64px', width: '64px' }}
    //     />
    //     <div className="ml-3">
    //       <div>{playlist.title}</div>
    //     </div> */}
    <div
      className="playlist-list"
      style={{ cursor: 'pointer' }}
      type="submit"
      onClick={handlePlay}
    >
      <Card className="playlist-item">
        <img
          className="playlist-image"
          src={playlist.albumUrl}
          alt=""
          style={{ height: '64px', width: '64px' }}
        />
        <div className="playlist-item-description">
          <h2>{playlist.title}</h2>
        </div>
      </Card>
    </div>
  );
}
