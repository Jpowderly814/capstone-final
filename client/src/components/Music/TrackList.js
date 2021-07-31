import React from 'react';
import './TrackList.css';
import Card from '../UI/Card';

const TrackList = (props) => {
  return (
    <div>
      {props.trackList.map((name, index) => {
        return (
          <div key={index}>
            <div
              className="track-list"
              style={{ cursor: 'pointer' }}
              type="submit"
              onClick={() => props.selectTrack(index, name.uri)}
            >
              <Card className="track-item">
                <img
                  className="track-image"
                  src={name.albumUrl}
                  alt=""
                  style={{ height: '64px', width: '64px' }}
                />
                <div className="track-item-description">
                  <h2>{name.title}</h2>
                </div>
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
