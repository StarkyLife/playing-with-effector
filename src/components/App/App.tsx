import React, { useEffect, useCallback } from 'react';
import { useStore } from 'effector-react';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';

import { $isAuthorized, login } from '../../stores/auth';

import Users from '../Users/Users';
import Groups from '../Groups/Groups';

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

  const handleGroupsListOpen = useCallback(() => {
    history.push(RoutesPaths.GROUPS_LIST);
  }, [history]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='App-menu'>
          <button
            disabled={ !isAuthorized }
            onClick={ handleUsersListOpen }
          >
            Users List
          </button>
          <button
            disabled={ !isAuthorized }
            onClick={ handleGroupsListOpen }
          >
            Groups List
          </button>
        </div>
        { isAuthorized && (
          <Switch>
            <Route
              path={ RoutesPaths.USERS_LIST }
              render={ () => <Users /> }
            />
            <Route
              path={ RoutesPaths.GROUPS_LIST }
              render={ () => <Groups /> }
            />
          </Switch>
        ) }
      </header>
    </div>
  );
};

export default App;
