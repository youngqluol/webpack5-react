## 一、目录结构
```js
├── app
|  └── index.js
├── build // webpack构建目录
|  ├── config
|  ├── scripts // 开发/打包脚本
|  ├── utils
|  ├── webpack.common.js // 通用打包配置
|  ├── webpack.dev.js // 开发打包配置
|  └── webpack.prod.js // 生产打包配置
├── coverage // 单测快照
|  ├── clover.xml
|  ├── coverage-final.json
|  ├── lcov-report
|  └── lcov.info
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
├── TODO.md
├── tsconfig.json
├── yarn.lock
└── __test__ // 单测
   ├── components
   ├── utils
   └── __mock__

```

## 二、启动前

#### 1. vscode扩展：
- `EditorConfig For vs Code`
- `prettier`
- `eslint`

#### 2. 下载依赖: 

```js
npm install
// 或 
yarn
```
## 三、启动

```js
npm run start
// 或 
yarn start
```

## 四、其他

#### 1. 构建

```js
npm run build 
// 或 
yarn build
```

#### 2. 包分析

```js
npm run build --report
```

#### 3. 格式化代码

```js
npm run lint
```

## 常见BUG

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


