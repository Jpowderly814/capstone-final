import {useState} from "react";
import FavoritesList from './FavoritesList';

const axios = require("axios");


const Profile = () => {
  const arr =[];
    const userId = localStorage.getItem("user")
    const [favoritesList, setFavoritesList] = useState([]);

    const showFavorites = (id) => {
      console.log(favoritesList);
      if (favoritesList === undefined || favoritesList === null || favoritesList.length === 0){
      
                axios.get(`http://localhost:3001/favorites/${id}`)
          .then((response) => {
            //console.log(response);
            console.log(response.data.length);
            //console.log(response.data.data);
            setFavoritesList(response.data);
          });
          
      }
      else{

        
      for (let i=0; i < (favoritesList.length); i++) {
            
            arr.push(favoritesList[i]);
        }

        console.log(arr);
      }

      console.log(favoritesList);
      console.log(arr[0]);
    } 

    return (
        <div>
            <h1>{userId}</h1>
            {showFavorites(userId)}
  
        </div>

    );


}

export default Profile;