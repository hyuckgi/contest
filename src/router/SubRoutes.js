import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { service } from '@/configs';

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
// refs = https://reacttraining.com/react-router/web/example/route-config

function SubRoutes(route) {
  if (service.getValue(route, 'redirect', false)) {
    return (
      <Route exact path="/">
        <Redirect to="/dashboard" /> 
      </Route>
    )
  }

  return (
    <Route
      path={route.path}
      render={props => {
        return (<route.component {...props} routes={route.routes} />)
      }}
    />
  );
}

export default SubRoutes;
