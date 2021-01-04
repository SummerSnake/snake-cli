module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'prettier/react',
    'prettier',
  ],
  settings: {
    // ESLint 支持在配置文件添加共享设置。你可以添加 settings 对象到配置文件，它将提供给每一个将被执行的规则。
    react: {
      version: 'detect',
    },
    'import/ignore': ['dist', 'node_modules'],
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  /**
   * off 或 0：表示不验证规则。
   * warn 或 1：表示验证规则，当不满足时，给警告
   * error 或 2 ：表示验证规则，不满足时报错
   */
  rules: {
    'prettier/prettier': 1,
    // typescript 相关校验规则
    '@typescript-eslint/no-unused-vars': 2, // 不允许有未使用的变量
    '@typescript-eslint/interface-name-prefix': 2, // 接口名称首字母大写
    '@typescript-eslint/explicit-member-accessibility': 0, // 允许 class 方法未使用 public static 关键字
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    // js 相关校验规则
    'no-console': 0, // 允许使用 console
    eqeqeq: ['warn', 'always'], // 要求使用 === 和 !==
    'no-debugger': 2, // 禁用debugger
    semi: 2, // 强制使用分号
    quotes: [2, 'single'], // 使用单引号
    'key-spacing': [2, { beforeColon: false, afterColon: true }], // 强制在对象字面量的属性中键和值之间使用一致的间距
    // React 相关校验规则
    'react/display-name': 0,
    'jsx-quotes': [2, 'prefer-double'], // 强制在JSX属性（jsx-quotes）中一致使用双引号
    'react/jsx-indent': [2, 2],
    'react/jsx-no-undef': [2, { allowGlobals: true }],
    'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
    // ES6 相关校验规则
    'comma-spacing': [2, { before: false, after: true }], // 控制逗号前后的空格
    'arrow-spacing': [2, { before: true, after: true }], // 强制箭头函数的箭头前后使用一致的空格
    'no-var': 2, // 要求使用 let 或 const 而不是 var
    // React hook 相关校验规则
    'react-hooks/rules-of-hooks': 'error',
    // "react-hooks/exhaustive-deps": "warn",
  },
};
