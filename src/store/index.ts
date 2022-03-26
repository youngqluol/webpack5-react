import * as React from 'react';
import { configure } from 'mobx';
import { counterStore } from './counter';
import { pageDataStore } from './pageData';

// https://zh.mobx.js.org/configuration.html
// 但是如过你的目标环境不支持 Proxy，你也可以通过配置将 Proxy 支持关闭: useProxies: 'never'
configure({ enforceActions: 'always', useProxies: 'never' });

export const stores = { counterStore, pageDataStore };
export const CounterContext = React.createContext(stores);
export const useStores = () => React.useContext(CounterContext);
