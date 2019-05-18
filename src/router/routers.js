import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/index.tsx';

export default class Routers extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}
