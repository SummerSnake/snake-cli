import React from 'react';
import { Input, Button, Icon } from 'antd';
import './index.scss';

export default class Login extends React.Component {
  state = {
    userName: 'admin',
    passWord: '123456',
  };

  render() {
    return (
      <div
        className="loginWrap"
        onKeyDown={async e => {
          if (e.keyCode === 13) {
          }
        }}
      >
        <div className="loginWrap">
          <div className="loginLeft">
            <i />
            <div>
              <p>snake-cli</p>
              <p />
            </div>
          </div>
          <div className="loginRight">
            <div>
              <h3>登陆</h3>
              <Input
                defaultValue={this.state.userName}
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)', fontSize: '20px' }} />
                }
                className="inputDom"
                onChange={e => {
                  this.setState({
                    userName: e.target.value,
                  });
                }}
                name="loginName"
                placeholder="请输入用户名"
              />
              <Input
                defaultValue={this.state.passWord}
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)', fontSize: '20px' }} />
                }
                className="inputDom"
                name="passWord"
                onChange={e => {
                  this.setState({
                    passWord: e.target.value,
                  });
                }}
                placeholder="请输入密码"
              />
              <Button type="primary" className="btnDom">登陆</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
