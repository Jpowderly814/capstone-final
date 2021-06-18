import React from 'react';


function FavoritesList (props) {

    const showFavorites = (props) => {
        console.log(props["favorites"]);
        //console.log(props["favorites"].length);
        //console.log(props["favorites"]);

        /*for (let i=0; i<props["favorites"].length; i++) {
            return (<div>
                <h1>{props["favorites"].name}</h1>
            </div>)
        }*/
        
        

    }
    return (
        <div>
        <div>{showFavorites(props)}</div>




        </div>
    );
}

export default FavoritesList;