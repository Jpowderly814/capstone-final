import React from "react"

export default function PlaylistSearchResult({ playlist , choosePlaylist }) {
  
  function handlePlay() {
    choosePlaylist(playlist)
  }

  /*return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  )*/

return (
    <div 
        className="d-flex m-2 align-items-center"
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
    >
        <img src={playlist.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{playlist.title}</div>
        
      </div>

    </div>
)

}