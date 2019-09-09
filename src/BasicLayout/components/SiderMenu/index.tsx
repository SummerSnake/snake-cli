import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menu from '@config/menu';
import { verArr } from '@utils/util';

interface InitProp {
  history: {
    location: {
      pathname?: string;
    };
    push: any;
  };
  location: {
    pathname?: string;
  };
}

function SiderMenu(props: InitProp) {
  const [keys, setKeys] = useState([]);
  const { pathname } = props.history && props.history.location;

  useEffect(() => {
    let keys = [];
    keys.push(pathname);
    setKeys(keys);
  }, [pathname]);

  /**
   * 处理选中路由
   */
  function handleSelect({ key }) {
    props.history.push(key);
  }

  /**
   * 当前选中项名字
   */
  function titleNode(item) {
    return (
      <span>
        <Icon type={item.icon} />
        <span>{item.name}</span>
      </span>
    );
  }

  const defaultKeys = (verArr(keys) && ['/' + keys[0].split('/')[1]]) || [];

  return (
    <div className="SideMenu_wrap">
      <Menu
        mode="inline"
        theme="dark"
        onSelect={handleSelect}
        selectedKeys={keys}
        defaultOpenKeys={defaultKeys}
      >
        {verArr(menu) &&
          menu.map(item =>
            item && verArr(item['list']) ? (
              <Menu.SubMenu key={item.path} title={titleNode(item)}>
                {item['list'].map(listItem => (
                  <Menu.Item key={item.path + listItem.path}>
                    <span>{listItem.name}</span>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.path}>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </Menu.Item>
            )
          )}
      </Menu>
    </div>
  );
}

export default withRouter(SiderMenu);
