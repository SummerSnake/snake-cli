import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/index';
import BasicLayout from '../BasicLayout/index';

export default class Routers extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={BasicLayout} />
        </Switch>
      </HashRouter>
    );
  }
}
