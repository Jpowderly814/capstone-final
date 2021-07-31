import Nav from './components/Main/Nav';
import React, { useState } from 'react';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log('App renderer');

  return (
    <div className="App">
      <Nav />
    </div>
  );
}

export default App;
