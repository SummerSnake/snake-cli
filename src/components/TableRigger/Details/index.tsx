import React from 'react';
import { Drawer } from 'antd';

interface InitProp {
  readonly infoId: any;
  component: any;
  title: string;
}
interface InitState {
  isShow: boolean;
  title: string;
}
class Details extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      title: props.title || '',
    };
  }

  render() {
    const { component: Component } = this.props;
    const { title, isShow } = this.state;

    return (
      <React.Fragment>
        <a
          onClick={e => {
            e.preventDefault();
            this.setState({ isShow: true });
          }}
        >
          详情
        </a>
        <Drawer
          title={title}
          placement="right"
          width="1000px"
          visible={isShow}
          onClose={() => {
            this.setState({ isShow: false });
          }}
          destroyOnClose
        >
          {Component && <Component infoId={this.props.infoId} />}
        </Drawer>
      </React.Fragment>
    );
  }
}

export default Details;
