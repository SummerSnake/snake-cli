import React from 'react';
// import { Input, Button, Icon, notification } from 'antd';
import styles from './index.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className={styles.homeWrap}>home</div>;
  }
}
