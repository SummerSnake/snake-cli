import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menu from '@config/menu';

interface InitProp {
  history: any[];
  location: {
    pathname?: any;
  };
}
interface InitState {
  keys: string[];
}
class SiderMenu extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
    };
  }
  componentWillMount = () => {
    this.selectKey();
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.selectKey();
    }
  };

  /**
   * 获取路由路径字符串供 menu 使用
   */
  selectKey = () => {
    let keys = [];
    keys.push(this.props.location.pathname);
    this.setState({ keys });
  };
  /**
   * 处理选中路由
   */
  handleSelect = ({ key }) => {
    this.props.history.push(key);
  };

  /**
   * 当前选中项名字
   */
  titleNode = item => {
    return (
      <span>
        <Icon type={item.icon} />
        <span>{item.name}</span>
      </span>
    );
  };

  render() {
    return (
      <div className="SideMenu_wrap">
        <Menu
          mode="inline"
          theme="dark"
          onSelect={this.handleSelect}
          selectedKeys={this.state.keys}
          defaultOpenKeys={['/' + this.state.keys[0].split('/')[1]]}
        >
          {menu.map((item: any) =>
            Array.isArray(item.list) && item.list.length > 0 ? (
              <Menu.SubMenu key={item.path} title={this.titleNode(item)}>
                {item.list.map(listItem => (
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
}

export default withRouter(SiderMenu);
