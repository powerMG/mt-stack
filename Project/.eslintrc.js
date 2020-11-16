module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never'
      }
    ],
    "semi": [2, "always"],//语句强制分号结尾
    "quotes": [1, "single"],//引号类型 `` "" ''
    "comma-dangle": [1, "never"],//对象字面量项尾不能有逗号
  },
  globals: {}
}
