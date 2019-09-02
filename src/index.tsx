import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import dva from '@utils/dva';
import models from './models';
import Routers from './router/routers';
import './index.less';

const dvaApp = dva.createApp({
  initialState: {},
  models,
});

const store = dvaApp.getStore();

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root')
);
