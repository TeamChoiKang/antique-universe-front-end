import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Game from '@/pages/Game';
import Main from '@/pages/Main';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import ScrollToTop from '@/ScrollToTop';

import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute>
          <Route path="/game">
            <Game />
          </Route>
        </PrivateRoute>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
