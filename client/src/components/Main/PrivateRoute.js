import { useState, useEffect } from 'react';
import AuthService from './Services/AuthService';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  // const isLoggedIn = AuthService.isLoggedIn();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') !== 'null'
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
