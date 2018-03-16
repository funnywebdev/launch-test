import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './pages/app/';
import Home from './pages/home';

export const getRoutes = ({ dispatch, getState }) => { // eslint-disable-line react/prop-types
  return (
    <Route component={App}>
      <Route path='/'>
        <IndexRoute component={Home}/>
      </Route>
    </Route>
  );
};
