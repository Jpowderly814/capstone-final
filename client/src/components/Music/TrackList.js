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
                return (
                <div>
                  
                
                <li><img src={name.albumUrl} style={{ height: "64px", width: "64px" }} />  {name.title}</li>
                </div>
                )
            })}
        </ul>
        </div>


            
    );

}

export default TrackList;