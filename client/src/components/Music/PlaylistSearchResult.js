import React from 'react';
import './PlaylistSearchResult.css';

export default function PlaylistSearchResult({ playlist, choosePlaylist }) {
  function handlePlay() {
    choosePlaylist(playlist);
    console.log(playlist);
  }

  return (
    <div
      data-testid="onclick"
      className="playlist-list"
      style={{ cursor: 'pointer' }}
      onClick={handlePlay}
    >
      <div className="playlist-item">
        <img
          src={playlist.albumUrl}
          alt=""
          style={{ height: '64px', width: '64px' }}
        />
        <div className="playlist-item-description">
          <h2>{playlist.title}</h2>
        </div>
      </div>
    </div>
  );
}
