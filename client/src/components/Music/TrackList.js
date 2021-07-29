import React from 'react';
// import './TrackList.css';

const TrackList = (props) => {
  console.log(props.trackList);

  return (
    <div>
      {props.trackList.map((name, index) => {
        return (
          <div key={index}>
            <div
              className="d-flex m-2 align-items-center"
              style={{ cursor: 'pointer' }}
            >
              <img
                src={name.albumUrl}
                alt=""
                style={{ height: '64px', width: '64px' }}
                onClick={props.selectTrack}
              />
              <div className="ml-3">
                <div>{name.title}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
