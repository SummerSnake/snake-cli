import React, { useState, useEffect } from 'react';
import { Spin, Form, Button, Input, notification } from 'antd';
import styles from './index.less';

interface InitProp {
  id?: any;
  tableCallback?: (isRefresh: boolean) => void;
}
function AddUser(props: InitProp) {
  const [_isLoading, setLoading] = useState<boolean>(false);
  const [_btnLoading, setBtnLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  useEffect(() => {
    initialization();
  }, []);

  /**
   * @desc notification
   * @param { string } type 图标类型
   * @param { string } message 标题
   * @param { string } description 内容
   */
  const openNotificationWithIcon = (type: string, message: string, description: string) => {
    notification[type]({
      message,
      description,
    });
  };

  /**
   * @desc 编辑初始化数据
   */
  const initialization = () => {
    if (props.id > 0) {
      setLoading(true);

      form.setFieldsValue({
        loginName: 'SummerSnake',
        phone: 13577886699,
        jobNum: 9521,
        email: '33661226lll@163.com',
        remarks: 'user.remarks',
      });

      setLoading(false);
    }
  };

  /**
   * @desc 提交表单
   */
  const handleSubmit = async () => {
    let adopt = false;
    let formVals = {};

    try {
      formVals = await form.validateFields();
      adopt = true;
    } catch (error) {
      openNotificationWithIcon('error', '表单验证失败', error);
    }

    if (adopt) {
      setBtnLoading(true);

      const data = {
        status: 200,
        msg: '操作成功',
        subMsg: '系统错误',
        formVals,
      };

      if (data['status'] === 200) {
        openNotificationWithIcon('success', data['msg'], '');
        props.tableCallback(true);
      } else {
        openNotificationWithIcon('error', '操作失败', data['subMsg']);
      }

      setBtnLoading(false);
    }
  };

  /**
   * @desc 关闭 Modal
   */
  const handleCancel = () => {
    props.tableCallback(false);
  };

  return (
    <Spin spinning={_isLoading}>
      <div className={styles.formWrap}>
        <Form form={form} layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <div className={styles.titleDom}>
            <span />
            <span>基本信息</span>
          </div>
          <div className={styles.rowDom}>
            <div className={styles.colDom}>
              <Form.Item
                name="loginName"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </div>
            <div className={styles.colDom}>
              <Form.Item
                name="phone"
                label="手机"
                rules={[{ required: true, message: '请输入手机' }]}
              >
                <Input placeholder="请输入手机" />
              </Form.Item>
            </div>
          </div>

          <div className={styles.rowDom}>
            <div className={styles.colDom}>
              <Form.Item
                name="jobNum"
                label="工号"
                rules={[{ required: true, message: '请输入工号' }]}
              >
                <Input placeholder="请输入工号" />
              </Form.Item>
            </div>
            <div className={styles.colDom}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[{ required: true, message: '请输入邮箱' }]}
              >
                <Input placeholder="请输入邮箱" />
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
              <Form.Item name="remarks" label="备注">
                <Input.TextArea autoSize={{ minRows: 6, maxRows: Infinity }} />
              </Form.Item>
            </div>
          </div>
        </Form>
        <div className={styles.btnGroup}>
          <Button onClick={handleCancel} className={styles.cancelBtn}>
            取消
          </Button>
          <Button
            className={styles.submitBtn}
            loading={_btnLoading}
            onClick={handleSubmit}
            type="primary"
          >
            提交
          </Button>
        </div>
      </div>
    </Spin>
  );
}

export default AddUser;
