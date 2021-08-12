import React from 'react';

import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  return (
    <Route
      render={({ location }) =>
        token ? (
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
