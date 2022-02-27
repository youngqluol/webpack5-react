## 待办清单

### 一. 整理目录

build目录：
   
- 拆分为 `webpack.config.common.js`、`webpack.config.dev.js`、`webpack.config.prod.js`

dist目录：

- 拆分为 `css`、`js`、`images`、`fonts`、`media`、`index.html`


eslint配置抽离：

- 加入`.editorconfig`、`.eslintrc.js`、`eslintignore`

```
eslint-plugin-react@^7.28.0 
@typescript-eslint/eslint-plugin@latest 
eslint-config-airbnb@latest 
eslint@^8.2.0
eslint-plugin-import@^2.25.3 
eslint-plugin-jsx-a11y@^6.5.1 
eslint-plugin-react-hooks@^4.3.0 
@typescript-eslint/parser@latest
```

eslint在@8.2.0+下@7.32.0版本

### 二. 集成prettier

- 加入`.prettierrc`、`.prettierignore`

### 三. 集成husky

- 提交格式化

- commit信息校验

### 四. 引入`react-router`、`redux`（或`mobX`）

### 五. 引入`ant-design`（或公司内部ui）

### 六. 封装`axios`请求

### 七. `mock`数据

### 八. 单元测试（可选）

## 其他

### 一、`start.js/build.js` 启动服务、打包过程加入`ora`，并用 `async await` 重构

### 二、`package.json`依赖整理


## BUG汇总

### 一、`eslint提示`不生效

*问题描述：*

eslint在@8.2.0+下 提示不生效，报错如下
```js
The eslint library loaded from /Users/Emily/Desktop/code/go-for-react/node_modules/eslint/lib/api.js doesn't export a CLIEngine. You need at least eslint@1.0.0
```

@7.32.0版本下可行
