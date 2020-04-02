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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      { isAuthorized && (
        <Users />
      ) }
    </div>
  );
}

export default App;
