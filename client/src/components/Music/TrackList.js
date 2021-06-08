import React from 'react';


const TrackList = (trackList) => {

    console.log(trackList);



    return (
        <div>
        <div>
            Track List 
        </div>
        <ul>
            {trackList.trackList.map(name => {
                return <li>{name.title}</li>
            })}
        </ul>
        </div>


    );

}

export default TrackList;