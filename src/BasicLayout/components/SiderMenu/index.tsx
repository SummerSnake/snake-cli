import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { HomeOutlined, TableOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import menu from '@config/menu';
import { verArr } from '@utils/util';

const Icons = {
  home: <HomeOutlined />,
  table: <TableOutlined />,
  setting: <SettingOutlined />,
};

type titleNode = {
  name: string;
  path: string;
  icon: string;
  list?: any[];
};
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
    setKeys([pathname]);
  }, [pathname]);

  /**
   * @desc 处理选中路由
   * @param { string } key 当前所选菜单项
   */
  const handleSelect = ({ key }) => props.history.push(key);

  /**
   * @desc 当前选中项名字
   * @param { object } item 当前所选菜单项
   */
  const titleNode = (item: titleNode) => {
    return (
      <span>
        {Icons[item.icon]}
        <span>{item.name}</span>
      </span>
    );
  };

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
          menu.map((item) =>
            item && verArr(item['list']) ? (
              <Menu.SubMenu key={item.path} title={titleNode(item)}>
                {item['list'].map((listItem) => (
                  <Menu.Item key={item.path + listItem.path}>
                    <span>{listItem.name}</span>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.path}>
                {Icons[item.icon]}
                <span>{item.name}</span>
              </Menu.Item>
            )
          )}
      </Menu>
    </div>
  );
}

export default withRouter(SiderMenu);
