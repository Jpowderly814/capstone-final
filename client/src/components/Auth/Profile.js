import {setState} from "react";
const axios = require("axios");

const Profile = () => {

    const [favoritesList, setFavoritesList] = setState([]);

    const getFavorites = (id) => {
        axios.get("http://localhost:3001/data", {id:localStorage.getItem("user")})
            .then(response => {
                console.log(response);

            })

    }

    return (
        <div>
            <h1>{localStorage.getItem("user")}</h1>
            <h1>{getFavorites}</h1>
        </div>

    );


}

export default Profile;