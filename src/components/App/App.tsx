import React, { useEffect, useCallback } from 'react';
import { useStore } from 'effector-react';
import { RouteComponentProps } from 'react-router-dom';

import { $isAuthorized, login } from '../../stores/auth';

import { RoutesPaths } from '../../utils/routes-constants';

import logo from './logo.svg';
import './App.css';

type Props = {
  history: RouteComponentProps['history']
};

const App: React.FC<Props> = ({
  history
}) => {
  const isAuthorized = useStore($isAuthorized);

  useEffect(() => {
    login()
  }, []);

  const handleUsersListOpen = useCallback(() => {
    history.push(RoutesPaths.USERS_LIST);
  }, [history]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          disabled={ !isAuthorized }
          onClick={ handleUsersListOpen }
        >
          Go To Users List
        </button>
      </header>
    </div>
  );
};

export default App;
