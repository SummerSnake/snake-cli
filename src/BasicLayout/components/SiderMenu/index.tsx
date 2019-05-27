import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menu from '@config/menu';
import styles from './index.scss';

interface InitProp {
  history: any;
  location: any;
}
interface InitState {
  keys: Array<any>;
}
class SiderMenu extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
    };
  }
  componentWillMount() {
    this.selectKey();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.selectKey();
    }
  }

  selectKey = () => {
    let keys = [];
    keys.push(this.props.history.location.pathname);
    this.setState({ keys });
  };

  handleSelect = ({ key }) => {
    this.props.history.push(key);
  };

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
