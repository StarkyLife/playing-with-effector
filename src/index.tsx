import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App/App';
import Users from './components/Users/Users';

import { RoutesPaths } from './utils/routes-constants';

import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route
          path={ RoutesPaths.BASE }
          exact={ true }
          render={ ({ history }) => <App history={ history } />}
        />
        <Route
          path={ RoutesPaths.USERS_LIST }
          render={ () => <Users /> }
        />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
