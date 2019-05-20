import React from 'react';
import { Input, Button, Icon } from 'antd';
import styles from './index.scss';

interface InitState {
  userName: string;
  passWord: string;
}
export default class Login extends React.Component<{}, InitState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: 'admin',
      passWord: '123456',
    };
  }

  render() {
    return (
      <div
        className={styles.loginWrap}
        onKeyDown={async e => {
          if (e.keyCode === 13) {
          }
        }}
      >
        <div className={styles.formDom}>
          <div className={styles.formLeft}>
            <i />
            <div>
              <p>snake-cli</p>
              <p>SummerSnake</p>
            </div>
          </div>
          <div className={styles.formRight}>
            <div>
              <h3>登陆</h3>
              <Input
                defaultValue={this.state.userName}
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)', fontSize: '20px' }} />
                }
                className={styles.inputDom}
                onChange={e => {
                  this.setState({
                    userName: e.target.value,
                  });
                }}
                placeholder="请输入用户名"
              />
              <Input
                defaultValue={this.state.passWord}
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)', fontSize: '20px' }} />
                }
                className={styles.inputDom}
                onChange={e => {
                  this.setState({
                    passWord: e.target.value,
                  });
                }}
                placeholder="请输入密码"
              />
              <Button type="primary" className={styles.btnDom}>
                登陆
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
