import React, { Component } from 'react';
import { Layout } from 'antd';
import SiderMenu from './components/SiderMenu/index';
const { Header, Content, Sider, Footer } = Layout;
import styles from './index.less';

export default class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout className={styles.layoutWrap}>
        <Sider className={styles.siderDom}>
          <div className={styles.logo}>Snake-cli</div>
          <SiderMenu />
        </Sider>

        <Layout className={styles.contentWrap}>
          <Header className={styles.conHeader} />
          <Content className={styles.conDom}>
            <div>1</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>SummerSnake</Footer>
        </Layout>
      </Layout>
    );
  }
}
