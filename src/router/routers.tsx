import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/index';
import BasicLayout from '../BasicLayout/index';

export default class Routers extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/layout" component={BasicLayout} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}
