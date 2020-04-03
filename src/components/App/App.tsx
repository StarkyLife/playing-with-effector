import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import { $isAuthorized, login } from '../../stores/auth';

import Users from '../Users/Users';

import logo from './logo.svg';
import './App.css';

function App() {
  const isAuthorized = useStore($isAuthorized);

  useEffect(() => {
    login()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        { isAuthorized && (
          <Users />
        ) }
      </header>
    </div>
  );
}

export default App;
