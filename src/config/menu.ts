export default [
  {
    name: '首页',
    path: '/home',
    icon: 'home',
  },
  {
    name: '表格',
    path: '/table',
    icon: 'table',
    list: [
      {
        name: '单个表格',
        path: '/SingleTable',
      },
      {
        name: '排班表格',
        path: '/Scheduling',
      },
      {
        name: '表格封装',
        path: '/TableRiggerExample',
      },
    ],
  },
  {
    name: '系统设置',
    path: '/system',
    icon: 'setting',
    list: [
      {
        name: '菜单管理',
        path: '/MenuManage',
      },
    ],
  },
];
