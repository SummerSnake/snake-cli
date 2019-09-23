import React from 'react';
import { Popconfirm, Button } from 'antd';
import { connect } from 'react-redux';
import { verVal } from '@utils/util';
import styles from './index.less';

interface InitProp {
  tableRigger?: {
    query?: any;
    queryShow?: any;
    pagination?: any;
    orders?: any;
  };
  dispatch?: any;
  mode?: number;
  btnType?: string;
  isBtn?: boolean;
  btnLoading?: boolean;
  title?: string;
  reminder?: string;
  onClick?: () => void;
}
function OperationBtn(props: InitProp = {}) {
  const handleClick = async () => {
    const { onClick, tableRigger = {}, dispatch, mode } = props;
    const { query, queryShow, pagination, orders } = tableRigger;

    if (verVal(onClick)) {
      await onClick();
      // mode 是否携带筛选条件刷新
      if (mode === 0) {
        const code = Math.round(Math.random() * 999999999);
        dispatch({
          type: 'tableRigger/fetch',
          payload: { query, queryShow, pagination, orders, code },
        });
      } else if (mode === 1) {
        dispatch({
          type: 'tableRigger/init',
        });
      }
    }
  };

  const { isBtn, btnType, btnLoading, title, reminder } = props;
  return (
    <span>
      {isBtn ? (
        <Button
          type={btnType === 'submit' ? 'primary' : 'default'}
          className={btnType === 'submit' ? styles.submitBtn : styles.cancelBtn}
          loading={btnLoading}
          onClick={handleClick}
        >
          {title}
        </Button>
      ) : (
        <span>
          {reminder ? (
            <Popconfirm title={reminder} onConfirm={handleClick}>
              <a>{title}</a>
            </Popconfirm>
          ) : (
            <a onClick={handleClick}>{title}</a>
          )}
        </span>
      )}
    </span>
  );
}

export default connect(({ tableRigger }: any) => ({ tableRigger }))(OperationBtn);
