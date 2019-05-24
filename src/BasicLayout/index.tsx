import React from 'react';
import { Layout } from 'antd';
import SiderMenu from './components/SiderMenu/index';
const { Header, Content, Sider, Footer } = Layout;
import styles from './index.scss';

export default class BasicLayout extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />
          <SiderMenu />
        </Sider>

        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>1</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>SummerSnake</Footer>
        </Layout>
      </Layout>
    );
  }
}
