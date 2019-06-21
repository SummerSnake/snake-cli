import React from 'react';
import { Layout } from 'antd';
const { Header, Content, Sider, Footer } = Layout;
import { Route } from 'react-router-dom';
import routes from '@config/routes';
import SiderMenu from './components/SiderMenu/index';
import styles from './index.less';

export default function BasicLayout() {
  return (
    <Layout className={styles.layoutWrap}>
      <Sider className={styles.siderDom}>
        <div className={styles.logo}>Snake-cli</div>
        <SiderMenu />
      </Sider>

      <Layout className={styles.contentWrap}>
        <Header className={styles.conHeader} />
        <Content className={styles.conDom}>
          {routes.map((item, i) => (
            <Route key={i.toString()} path={item.path} component={item.component} exact />
          ))}
        </Content>
        <Footer style={{ textAlign: 'center' }}>SummerSnake</Footer>
      </Layout>
    </Layout>
  );
}
