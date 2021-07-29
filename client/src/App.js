import Nav from './components/Main/Nav';
import React, { useState } from 'react';
import UserService from './Services/UserService';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const userService = new UserService();

const UserContext = React.createContext(null);

function App() {
  const [value, setValue] = useState('');

  return (
    <div className="App">
      <UserContext.Provider value={userService}>
        <Nav />
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
