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

// 放置在你需要热加载的模块， 放在入口就行了
if (module && module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root')
);
