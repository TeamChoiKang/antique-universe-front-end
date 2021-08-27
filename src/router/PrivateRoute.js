import React, { useEffect, useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import AuthService from '@/api/AuthService';
import UserContext from '@/contexts/user';
import Socket from '@/utils/socket';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const { state, actions } = useContext(UserContext);
  const { isLoggedin } = state;
  const { setIsLoggedin, setUser } = actions;

  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');

    if (token) {
      AuthService.validateToke(token).then(user => {
        setUser(user);
        setIsLoggedin(true);
        Socket.initInstance(user.userId);
        history.push(location.pathname);
      });
    }
  }, []);

  return (
    <Route
      render={() =>
        isLoggedin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
