import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/index';
import BasicLayout from '../BasicLayout/index';

export default function Routers() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={BasicLayout} />
      </Switch>
    </HashRouter>
  );
}
