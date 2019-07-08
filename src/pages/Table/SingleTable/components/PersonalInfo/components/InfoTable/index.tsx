import React, { useState, useEffect } from 'react';
import { Table, Tag, Divider } from 'antd';

interface InitProps {
  infoData: any;
}
function InfoTable(props: InitProps) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (Object.keys(props.infoData).length > 1) {
      setDataSource([...dataSource, props.infoData]);
    }
  }, [props.infoData]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href="javascript:;">{text}</a>,
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
          {tags.map(tag => {
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
          <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Table pagination={false} columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default InfoTable;
