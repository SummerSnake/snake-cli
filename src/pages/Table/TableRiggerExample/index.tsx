import React from 'react';
import { Menu, Dropdown, Divider, Icon } from 'antd';
import {
  CommonTable,
  Statistics,
  Search,
  FilterTags,
  FormModal,
  OperationBtn,
} from '@components/TableRigger';
import AddUser from './component/AddUser';
import styles from './index.less';

const _statistics = {
  topJson: [
    {
      displayTitle: '账号汇总',
      displayField: 'totalAccount',
    },
    {
      displayTitle: '未冻结',
      displayField: 'unfrozen',
      queryTitle: '冻结状态',
      queryField: 'freezeState',
      queryValue: ['0'],
    },
    {
      displayTitle: '已冻结',
      displayField: 'frozen',
      queryTitle: '冻结状态',
      queryField: 'freezeState',
      queryValue: ['1'],
    },
  ],
};

const search = {
  general: {
    queryTitle: '手机号',
    queryField: 'phone',
  },
  advanced: [
    {
      queryTitle: '创建日期',
      queryField: 'createDate',
      component: 'DatePicker',
    },
    {
      queryTitle: '邮箱',
      queryField: 'email',
      component: 'Input',
    },
    {
      queryTitle: '冻结状态',
      queryField: 'freezeState',
      component: 'Select-Multiple',
      componentData: [{ value: '0', title: '未冻结' }, { value: '1', title: '已冻结' }],
    },
    {
      queryTitle: '修改日期',
      queryField: 'updateDate',
      component: 'RangePicker',
    },
    {
      queryTitle: '用户类别',
      queryField: 'userType',
      component: 'Select',
      componentData: [{ value: '0', title: 'A类别' }, { value: '1', title: 'B类别' }],
    },
  ],
};

interface InitState {
  _columns: any[];
}
class TableRiggerExample extends React.Component<null, InitState> {
  constructor(props) {
    super(props);
    this.state = {
      _columns: [],
    };
  }

  componentWillMount = () => {
    this.columnsUp();
  };

  /**
   * @desc 操作栏按钮点击事件
   * @param { any } id
   */
  handleBtnClick = id => {
    console.log(id);
  };

  /**
   * @desc 设置表头
   */
  columnsUp = () => {
    const that = this;

    this.setState({
      _columns: [
        {
          title: '序号',
          width: '6%',
          dataIndex: 'id',
          isIncrement: true,
        },
        {
          title: '手机号',
          width: '14%',
          dataIndex: 'phone',
        },
        {
          title: '创建日期',
          width: '14%',
          dataIndex: 'createDate',
          sorter: true,
        },
        {
          title: '邮箱',
          width: '14%',
          dataIndex: 'email',
        },
        {
          title: '冻结状态',
          width: '12%',
          dataIndex: 'freezeState',
          filters: [
            {
              text: '未冻结',
              value: '0',
            },
            {
              text: '已冻结',
              value: '1',
            },
          ],
          render(text) {
            return text === '0' ? '未冻结' : '已冻结';
          },
        },
        {
          title: '修改日期',
          width: '14%',
          dataIndex: 'updateDate',
        },
        {
          title: '用户类别',
          width: '12%',
          dataIndex: 'userType',
          render(text) {
            return text === '0' ? 'A类别' : 'B类别';
          },
        },
        {
          title: '操作',
          width: '12%',
          dataIndex: 'operate',
          render(text, record) {
            const MenuWrap = (
              <Menu>
                <Menu.Item>
                  <OperationBtn
                    title="重置密码"
                    mode={0}
                    onClick={() => {
                      that.handleBtnClick(record.id);
                    }}
                  />
                </Menu.Item>
                <Menu.Item>
                  <OperationBtn
                    title="删除"
                    mode={0}
                    reminder="此操作将会将用户删除，确认操作吗？"
                    onClick={() => {
                      that.handleBtnClick(record.id);
                    }}
                  />
                </Menu.Item>
              </Menu>
            );
            return (
              <div>
                <FormModal id={record.id} title="编辑" component={AddUser} />
                <Divider type="vertical" />
                <Dropdown overlay={MenuWrap} placement="bottomLeft">
                  <Icon
                    type="ellipsis"
                    style={{ paddingTop: '10px', fontSize: 14, color: '#40a9ff' }}
                  />
                </Dropdown>
              </div>
            );
          },
        },
      ],
    });
  };

  render() {
    const { _columns } = this.state;

    return (
      <div className={styles.baseTableWrap}>
        <Statistics sourceUrl={'/api/get_top_json'} topJson={_statistics.topJson} />
        <div className={styles.screenTag}>
          <Search
            general={search.general}
            advanced={search.advanced}
            operationBlock={[<FormModal key="1" title="添加用户" component={AddUser} />]}
          />
          <FilterTags />
        </div>
        <div className={styles.tableWrap}>
          <div>
            <CommonTable
              operationBlock={[
                {
                  title: '批量操作',
                  onClick: (idArr, objArr) => {
                    console.log(idArr, objArr);
                  },
                },
              ]}
              listUrl={'/api/get_table_rigger'}
              columns={_columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TableRiggerExample;
