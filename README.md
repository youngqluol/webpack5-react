## 一、目录

```js
├── app // 本地模拟服务
|  └── index.js
├── build // webpack构建目录
|  ├── config
|  ├── scripts // 开发/打包脚本
|  ├── utils
|  ├── webpack.common.js // 通用打包配置
|  ├── webpack.dev.js // 开发打包配置
|  └── webpack.prod.js // 生产打包配置
├── dist // 构建产物
|  ├── css
|  ├── favicon.ico
|  ├── image
|  ├── index.html
|  └── js
├── jest.config.js // jest配置
├── package.json
├── public 
|  ├── favicon.ico
|  └── index.html
├── README.md
├── src 
|  ├── assets // 静态资源
|  ├── components // 组件
|  ├── index.tsx // 入口文件
|  ├── pages // 页面
|  ├── react-app-env.d.ts // 类型文件
|  ├── route // 路由
|  ├── service // 请求配置
|  ├── store // 状态管理(mobX)
|  ├── style // 样式
|  └── utils // 通用工具
├── tsconfig.json
└── __test__ // 单测
   ├── components
   ├── utils
   └── __mock__

```

## 二、下载依赖: 

```js
pnpm install
```

## 三、启动

```js 
pnpm start
```

## 四. 构建

```js
pnpm build
```


