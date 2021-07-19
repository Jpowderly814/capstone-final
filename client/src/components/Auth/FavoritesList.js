import React from 'react';

function FavoritesList(props) {
  return (
    <div>
      <ul>
        {props.map((favorite) => (
          <li key={favorite.id}>{favorite.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
