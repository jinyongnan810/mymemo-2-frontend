import React, {Fragment, useEffect} from 'react';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
// redux
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// actions
import {loadUser} from './actions/auth';
// login and register
import Login from './components/auth/Login';
// import Routes from "./components/routing/Routes";
import Dashboard from './components/Dashboard';
// alerts
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './store';

const alertOptions = {
  timeout: 3000,
  position: 'bottom center',
};

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Alert />
            <Switch>
              <Route exact path='/' component={
    Dashboard} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
