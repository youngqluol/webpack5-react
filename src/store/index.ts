import * as React from 'react';
import { configure } from 'mobx';
import { counterStore } from './counter';
import { pageDataStore } from './pageData';

configure({ enforceActions: 'always' });

export const stores = { counterStore, pageDataStore };
export const CounterContext = React.createContext(stores);
export const useStores = () => React.useContext(CounterContext);
