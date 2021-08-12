import React from 'react';
import './Home.css';

import Connect from './Connect';
import Dashboard from '../Music/Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

function Home() {
  return code ? <Dashboard code={code} /> : <Connect />;
}

export default Home;
