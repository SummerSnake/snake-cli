import React from 'react';
import { Input, Button, Icon, notification } from 'antd';
import styles from './index.scss';

interface InitState {
  // userName: string;
  //   password: string;
}
export default class Home extends React.Component<{}, InitState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.homeWrap}>
        <Button>btn</Button>
      </div>
    );
  }
}
