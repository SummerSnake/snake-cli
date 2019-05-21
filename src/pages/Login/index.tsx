import React from 'react';
import { withRouter } from 'react-router';
import { Input, Button, Icon, notification } from 'antd';
import styles from './index.scss';

interface InitState {
  userName: string;
  password: string;
}
class Login extends React.Component<{}, InitState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: 'admin',
      password: '123456',
    };
  }

  /**
   * 提交登陆
   */
  handleSubmit = () => {
    if (this.state.userName === 'admin' && this.state.password === '123456') {
      const { history } = this.props;
      history.push('/home');
    } else {
      notification.error({ message: '用户名：admin, 密码：123456' });
    }
  };

  render() {
    return (
      <div
        className={styles.loginWrap}
        onKeyDown={async e => {
          const { userName, password } = this.state;
          if (e.keyCode === 13) {
            if (userName === 'admin' && password === '123456') {
              const { history } = this.props;
              history.push('/home');
            } else {
              notification.error({ message: '用户名：admin, 密码：123456' });
            }
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
                defaultValue={this.state.password}
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)', fontSize: '20px' }} />
                }
                className={styles.inputDom}
                onChange={e => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
                placeholder="请输入密码"
              />
              <Button
                type="primary"
                className={styles.btnDom}
                onClick={this.handleSubmit.bind(this)}
              >
                登陆
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
