import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/index.tsx';
import Layout from '../Layout/index.tsx';

export default class Routers extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/layout" component={Layout} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}
