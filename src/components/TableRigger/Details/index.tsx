import React from 'react';
import { Drawer } from 'antd';

interface InitProp {
  info: any;
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
    const { title, isShow } = this.state;

    return (
      <React.Fragment>
        <Drawer title={title} placement="right" width="1000px" visible={isShow} destroyOnClose>
          {this.props.info && this.props.info}
        </Drawer>
      </React.Fragment>
    );
  }
}

export default Details;
