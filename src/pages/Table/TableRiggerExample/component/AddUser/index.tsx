import React from 'react';
import { Spin, Form, Button, Input, notification } from 'antd';
import styles from './index.less';

interface InitProp {
  id?: any;
  form?: any;
  tableCallback?: (isRefresh: boolean) => void;
}
interface InitState {
  _btnLoading: boolean;
  _isLoading: boolean;
}
class AddUser extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    this.state = {
      _btnLoading: false,
      _isLoading: false,
    };
  }

  componentDidMount() {
    this.initialization();
  }

  /**
   * @desc 编辑初始化数据
   */
  initialization = async () => {
    if (this.props.id > 0) {
      this.setState({ _isLoading: true });
      this.props.form.setFieldsValue({
        loginName: 'SummerSnake',
        phone: 13577886699,
        jobNum: 9521,
        email: '33661226lll@163.com',
        remarks: 'user.remarks',
      });
      this.setState({ _isLoading: false });
    }
  };

  /**
   * @desc 提交表单
   */
  handleSubmit = async () => {
    let adopt = false;
    this.props.form.validateFields(err => {
      adopt = !err;
    });
    if (adopt) {
      this.setState({ _btnLoading: true });
      const data = {
        status: 200,
        msg: '添加用户成功',
      };
      this.setState({ _btnLoading: false });
      if (data['status'] === 200) {
        notification.success({ message: data['msg'] });
        this.props.tableCallback(true);
      } else {
        notification.error({ message: data['msg'], description: data['subMsg'] });
      }
    }
  };

  /**
   * @desc 关闭 Modal
   */
  handleCancel = () => {
    this.props.tableCallback(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { _isLoading, _btnLoading } = this.state;

    return (
      <Spin spinning={_isLoading}>
        <div className={styles.formWrap}>
          <Form layout="horizontal">
            <div className={styles.titleDom}>
              <span />
              <span>基本信息</span>
            </div>
            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item label="用户名" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('loginName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户名',
                      },
                    ],
                  })(<Input placeholder="请输入用户名" />)}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item label="手机" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入手机',
                      },
                    ],
                  })(<Input placeholder="请输入手机" />)}
                </Form.Item>
              </div>
            </div>

            <div className={styles.rowDom}>
              <div className={styles.colDom}>
                <Form.Item label="工号" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('jobNum', {
                    rules: [
                      {
                        required: true,
                        message: '请输入工号',
                      },
                    ],
                  })(<Input placeholder="请输入工号" />)}
                </Form.Item>
              </div>
              <div className={styles.colDom}>
                <Form.Item label="邮箱" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: '请输入邮箱',
                      },
                    ],
                  })(<Input placeholder="请输入邮箱" />)}
                </Form.Item>
              </div>
            </div>

            {/* 分割线 */}

            <div className={styles.titleDom}>
              <span />
              <span>其他</span>
            </div>
            <div className={styles.rowDom} style={{ width: '50%' }}>
              <div className={styles.colDom}>
                <Form.Item label="备注" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('remarks')(<Input.TextArea autosize={{ minRows: 7 }} />)}
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className={styles.btnGroup}>
            <Button onClick={this.handleCancel} className={styles.cancelBtn}>
              取消
            </Button>
            <Button
              className={styles.submitBtn}
              loading={_btnLoading}
              onClick={this.handleSubmit}
              type="primary"
            >
              提交
            </Button>
          </div>
        </div>
      </Spin>
    );
  }
}

const AddUserComponent = Form.create()(AddUser);

export default AddUserComponent;
