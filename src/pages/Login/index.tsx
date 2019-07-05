import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Icon, notification } from 'antd';
import styles from './index.less';

interface InitProp {
  history: any[];
}
function Login(props: InitProp) {
  const [userName, setUserName] = useState<string>('admin');
  const [password, setPassword] = useState<string>('123456');
  /**
   * 提交登陆
   */
  function handleSubmit() {
    if (userName === 'admin' && password === '123456') {
      const { history } = props;
      history.push('/home');
      localStorage.setItem('accessToken', 'login');
    } else {
      notification.error({ message: '用户名：admin, 密码：123456' });
    }
  }
  return (
    <div
      className={styles.loginWrap}
      onKeyDown={async e => {
        if (e.keyCode === 13) {
          handleSubmit();
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
              defaultValue={userName}
              prefix={<Icon type="user" className={styles.iconDom} />}
              className={styles.inputDom}
              onChange={e => {
                setUserName(e.target.value);
              }}
              placeholder="请输入用户名"
            />
            <Input
              defaultValue={password}
              prefix={<Icon type="lock" className={styles.iconDom} />}
              className={styles.inputDom}
              onChange={e => {
                setPassword(e.target.value);
              }}
              placeholder="请输入密码"
            />
            <Button
              type="primary"
              className={styles.btnDom}
              onClick={() => {
                handleSubmit();
              }}
            >
              登陆
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
