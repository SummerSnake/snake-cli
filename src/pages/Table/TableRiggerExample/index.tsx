import React from 'react';
import { Tag, Divider } from 'antd';
import { CommonTable, Statistics, Search, FilterTags } from '@components/TableRigger';
import styles from './index.less';

const _statistics = {
  topJson: [
    {
      displayTitle: '已发送',
      displayField: 'alreadySent',
      queryTitle: '消息状态',
      queryField: 'informationState',
      queryValue: ['0'],
    },
    {
      displayTitle: '已撤回',
      displayField: 'noSend',
      queryTitle: '消息状态',
      queryField: 'informationState',
      queryValue: ['2'],
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

  columnsUp = () => {
    this.setState({
      _columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
              }}
            >
              {text}
            </a>
          ),
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <span>
              {tags.map((tag: string) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <span>Invite {record.name}</span>
              <Divider type="vertical" />
              <span>Delete</span>
            </span>
          ),
        },
      ],
    });
  };

  render() {
    const { _columns } = this.state;

    return (
      <div className={styles.baseTableWrap}>
        <Statistics sourceUrl={''} topJson={_statistics.topJson} />
        <div className={styles.screenTag}>
          <Search general={search.general} advanced={search.advanced} />
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
