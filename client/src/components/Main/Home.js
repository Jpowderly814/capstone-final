import React from 'react';
import './Home.css';

//import {BrowserRouter as Router, Route} from 'react-router-dom';

function Home() {
  return (
  
        
    

    <div className="home-search-container">
        <div className="home-search-box">
        <input type="text" className="home-search-input" id="searchTerm" name="searchTerm" placeholder="This is a search bar"/>
        <button type="submit" className="home-search-btn" value="Search"  ><span>Search</span></button>

        </div>

    </div>
   
     
  );
}

export default Home;