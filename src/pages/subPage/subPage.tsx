import React from 'react';
import { Button } from 'antd';
import imgUrl from '../../../asset/01.jpeg';

export default class SubPage extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>SubPage</h1>
        <img src={imgUrl} alt="" />
        <Button type="primary">按钮</Button>
      </div>
    );
  }
}
