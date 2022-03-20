## 待办清单
### 一. 集成husky

- 提交格式化

- commit信息校验

### 二. 引入及配置`react-router`、`redux`（或`mobX`）

### 五. 引入`ant-design`（或公司内部ui）

### 六. 封装`axios`请求 √

### 七. `mock`数据

### 八. 单元测试（可选）


## BUG汇总

### 一、`eslint提示`不生效

*问题描述：*

eslint提示不生效，vscode*输出*如下:

```js
The eslint library loaded from /Users/Emily/Desktop/code/go-for-react/node_modules/eslint/lib/api.js doesn't export a CLIEngine. You need at least eslint@1.0.0
```

*解决:*

删除全局eslint:

```js
npm uninstall eslint -g
或
yarn global remove eslint
```

## toStudy

1. hooks: useCallback, useRef, useMemo, useEffect, ...
2. react应用 调试插件（类似vue的devTools）
