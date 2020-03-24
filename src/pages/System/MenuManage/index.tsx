import React, { useState, useEffect } from 'react';
import { WindowsOutlined, TableOutlined, SettingOutlined, FolderOutlined } from '@ant-design/icons';
import { Spin, Tree, Tag, Popconfirm } from 'antd';
import { getRequest } from '@services/api';
import styles from './index.less';
import '../../../../mock/menuManageApi';

const Icons = {
  windows: <WindowsOutlined />,
  table: <TableOutlined />,
  setting: <SettingOutlined />,
};

function MenuManage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isTagSelect, setIsTagSelect] = useState<number>(0);
  const [menuList, setMenuList] = useState<any[]>([]);
  const [menuItemInfo, setMenuItemInfo] = useState<any>({});

  /**
   * @desc 递归树节点
   * @param { any[] } menuList 菜单树
   * @param { index } index 菜单项的层级
   * @return { any[] } 递归完成的树
   */
  const recursion = (menuList = [], index: number) => {
    const arr = [];
    menuList.forEach(item => {
      if (item.parentId === index) {
        arr.push(
          <Tree.TreeNode
            title={
              <Tag
                className={isTagSelect === item.id ? styles.treeNodeActive : styles.treeNode}
                onClick={() => {
                  setIsTagSelect(item.id);
                  setMenuItemInfo(item);
                }}
              >
                {Icons[item.menuImg]} &nbsp;&nbsp;{item.menuName}
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

  /**
   * @desc 获取数据
   */
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
                  <Tag
                    className={isTagSelect === 0 ? styles.treeNodeActive : styles.treeNode}
                    onClick={() => {
                      setIsTagSelect(0);
                      setMenuItemInfo({});
                    }}
                  >
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

        <div className={styles.menuRight} style={{ display: !!menuItemInfo.id ? 'block' : 'none' }}>
          <div>
            <div>
              <span className={styles.btnDom}>添加下级菜单</span>
              <span
                className={styles.btnDom}
                style={{ display: !!menuItemInfo.id ? 'inline-block' : 'none' }}
              >
                修改菜单
              </span>
              <Popconfirm title="确认删除吗">
                <span
                  className={styles.btnDom}
                  style={{ display: !!menuItemInfo.id ? 'inline-block' : 'none' }}
                >
                  删除菜单
                </span>
              </Popconfirm>
            </div>
            <div className={styles.tagsWrap}>
              <Tag>菜单名称: {menuItemInfo.menuName}</Tag>
              <Tag>菜单标识: {menuItemInfo.menuCode}</Tag>
              <Tag>菜单类别: {menuItemInfo.menuType}</Tag>
              <Tag>菜单图标: {menuItemInfo.menuImg}</Tag>
              <Tag>菜单地址: {menuItemInfo.menuUrl}</Tag>
              <Tag>菜单顺序: {menuItemInfo.sort}</Tag>
              <Tag>父级名称: {menuItemInfo.parentName}</Tag>
              <Tag>备注: {menuItemInfo.remarks}</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuManage;
