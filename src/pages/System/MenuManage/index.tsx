import React, { useState, useEffect } from 'react';
import { FolderOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Spin, Tree, Tag } from 'antd';
import { getRequest } from '@services/api';
import styles from './index.less';
import '../../../../mock/menuManageApi';

function MenuManage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isTagSelect, setIsTagSelect] = useState<number>(0);
  const [menuList, setMenuList] = useState<any[]>([]);

  const recursion = (menuList = [], index: number) => {
    const arr = [];
    menuList.forEach(item => {
      if (item.parentId === index) {
        arr.push(
          <Tree.TreeNode
            title={
              <Tag
                className={isTagSelect === item.id ? styles.treeNodeActive : styles.treeNode}
                onClick={() => setIsTagSelect(item.id)}
              >
                <LegacyIcon
                  type={
                    item.menuImg
                      ? item.menuImg
                      : item.menuType === 0
                      ? 'appstore'
                      : item.menuType === 1
                      ? 'pic-right'
                      : 'poweroff'
                  }
                />
                &nbsp;&nbsp;{item.menuName}
              </Tag>
            }
            key={item.id}
          >
            {recursion(item.children, item.id)}
          </Tree.TreeNode>
        );
      }
    });
    return arr;
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await getRequest('/api/get_menu_manage_tree', null);
    if (data['data']['status'] === 200) {
      setMenuList([...data['data']['data']]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.menuManageWrap}>
      <div className={styles.menuCon}>
        <Spin spinning={loading}>
          <div className={styles.menuLeft}>
            <Tree showLine defaultExpandAll>
              <Tree.TreeNode
                title={
                  <Tag className={isTagSelect === 0 ? styles.treeNodeActive : styles.treeNode}>
                    <FolderOutlined />
                    &nbsp;&nbsp;菜单结构
                  </Tag>
                }
                key="0"
              >
                {recursion(menuList, 0)}
              </Tree.TreeNode>
            </Tree>
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default MenuManage;
