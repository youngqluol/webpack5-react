## 一、启动前

#### 1. node版本要求：`14.17.0` || `16.0.0+`

#### 2. 下载vscode扩展：
- `EditorConfig For vs Code`
- `prettier`
- `eslint`

#### 3. 刪除全局eslint：

```js
npm uninstall eslint -g
或
yarn global remove eslint
```

#### 4. 下载依赖: 

```js
npm install 
// 或 
yarn
```
## 二、启动

```js
npm run start
// 或 
yarn start
```

## 三、其他

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
