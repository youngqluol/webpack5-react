import * as React from 'react';
import { configure } from 'mobx';
import { counterStore } from './counter';
import { pageDataStore } from './pageData';

// https://zh.mobx.js.org/configuration.html
// 但是如过你的目标环境不支持 Proxy，你也可以通过配置将 Proxy 支持关闭: useProxies: 'never'
configure({ enforceActions: 'always', useProxies: 'never' });

export const stores = { counterStore, pageDataStore };
export const storeContext = React.createContext(stores);

// 装饰器：用于组件式
type IReactComponent<P = any> = React.ClassicComponentClass<P> | React.ComponentClass<P>;
export function injectStores<T extends IReactComponent>(component: T) {
  (component as React.ComponentClass<any, any>).contextType = storeContext;
  return component as T;
}

// hook：用于函数式
export const useStores = () => React.useContext(storeContext);
