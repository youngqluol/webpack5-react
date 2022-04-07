## 待办清单
### 一. 集成husky

- 提交格式化

- commit信息校验
### 二. `mock`数据

TODO: app目录下本地模拟服务
### 三. 样式隔离优化

目前采用的是`cssModule`方式，后续可以集成`styled-components`

**tips**: webpack里`css-loader`的`modules.mode`配置是：
- `.css/.less`使用`icss`模式
- `.module.css/.module.less`使用`local`模式

二者区别可以参考：https://webpack.docschina.org/loaders/css-loader/

https://blog.esunr.xyz/2020/04/%E5%9C%A8React%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%9B%B4%E5%A5%BD%E7%9A%84CSS-Modules/#2-1-%E5%89%8D%E6%9C%9F%E5%87%86%E5%A4%87

## toStudy

1. hooks: useCallback, useRef, useMemo, useEffect, ...
2. react应用 调试插件（类似vue的devTools）
