import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import imgUrl from '../asset/01.jpeg';
import imgUrl2 from '../asset/rhinoceros.gif';
import './index.scss';

ReactDOM.render(
  <Fragment>
    <div>
      <h1 className="titleDom">从0构建React脚手架</h1>
      <img src={imgUrl} alt="" />
      <img src={imgUrl2} alt="" />
    </div>
  </Fragment>,
  document.getElementById('root')
);
