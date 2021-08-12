import React, { useContext } from 'react';
import './Home.css';

import Connect from './Connect';
import Dashboard from '../Music/Dashboard';
import { UserContext } from '../..';

const code = new URLSearchParams(window.location.search).get('code');

function Home() {
  const userService = useContext(UserContext);
  console.log(userService.user?.username);
  return code ? <Dashboard code={code} /> : <Connect />;
}

export default Home;
