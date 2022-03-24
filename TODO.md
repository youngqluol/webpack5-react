## 待办清单
### 一. 集成husky

- 提交格式化

- commit信息校验

### 二. 引入及配置`react-router`、`redux`（或`mobX`）

### 五. 引入`ant-design`（或公司内部ui）

### 六. 封装`axios`请求 √

### 七. `mock`数据

### 八. 单元测试（可选）

### 九. 样式隔离优化

目前webpack里`css-loader`的`modules.mode`配置是：
- `.css/.less`使用`icss`模式
- `.module.css/.module.less`使用`local`模式

二者区别可以参考：https://webpack.docschina.org/loaders/css-loader/

https://blog.esunr.xyz/2020/04/%E5%9C%A8React%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%9B%B4%E5%A5%BD%E7%9A%84CSS-Modules/#2-1-%E5%89%8D%E6%9C%9F%E5%87%86%E5%A4%87


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
