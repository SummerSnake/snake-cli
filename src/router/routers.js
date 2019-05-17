import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SubPage from '../pages/subPage/subPage.tsx';

export default class Routers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SubPage} />
          <Route path="/subpage" component={SubPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
