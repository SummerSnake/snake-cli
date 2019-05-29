import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/index';
import BasicLayout from '../BasicLayout/index';

export default class Routers extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={BasicLayout} />
        </Switch>
      </BrowserRouter>
    );
  }
}
