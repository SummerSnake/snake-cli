import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Index from '../index.tsx';
import SubPage from '../pages/subPage/subPage.tsx';

export default class Router extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/subpage" component={SubPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
