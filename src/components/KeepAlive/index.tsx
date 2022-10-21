import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, Icon, Button } from '@kdcloudjs/kdesign';
import styled from 'styled-components';
import classNames from 'classnames';
import { useComponentWillMount } from '@src/utils/hooks/uselifeCycle';
// import { usePrevious } from '@src/utils/hooks/usePrevios';
// import Content1 from '../MenuTabs/tabComponents/Content1';

const TabWrap = styled.div`
  .kd-tab-custome {
    .kd-active-line {
      display: none;
    }
  }
`;

const { TabPane } = Tabs;

let compNum = 1;

// 组件信息
const commonCompsInfo = [
  {
    type: 'content1', // 组件类型
    key: 'content1', // 组件唯一标识：key
    name: 'content1', // 组件名称：tab页名称
    component: lazy(() => import('../MenuTabs/tabComponents/Content1')),
    componentProps: {}, // 组件props
  },
  {
    type: 'content2',
    key: 'content2',
    name: 'content2',
    component: lazy(() => import('../MenuTabs/tabComponents/Content2')),
    componentProps: {},
  },
  {
    type: 'content3',
    key: 'content3',
    name: 'content3',
    component: lazy(() => import('../MenuTabs/tabComponents/Content3')),
    componentProps: {},
  },
];

export default function KeepAlive() {
  const [currentKey, updateCurrentKey] = useState(commonCompsInfo[0].key);
  const [currentComps, updateCurrentComps] = useState(commonCompsInfo.slice(0, 1));

  const prevActiveKeyRef = useRef(commonCompsInfo[0].key); // TODO 保存上一个tab key

  const navigate = useNavigate();

  const { tabName } = useParams(); // 路由path

  // 保存上一个key并更新当前key
  const saveAndUpdateKey = key => {
    prevActiveKeyRef.current = currentKey;
    updateCurrentKey(key);
  };

  // 改变url时，tab需相应改变
  useEffect(() => {
    // TODO 如果非首页，需要添加tab
    // saveAndUpdateKey(tabName || commonCompsInfo[0].key);
    console.log('tabName', tabName);
    addItem(tabName);
  }, [tabName]);

  const backHome = e => {
    e.stopPropagation();
    saveAndUpdateKey(commonCompsInfo[0].key);
    navigate('');
  };

  const onTabsChange = key => {
    // console.error('onTabsChange:', key);
    saveAndUpdateKey(key);
    if (key === commonCompsInfo[0].key) {
      navigate('');
      return;
    }
    navigate(`${key}`);
  };

  // operations
  const removeItem = key => {
    if (typeof key !== 'string') {
      return;
    }
    console.log('removeItem key: ', key);
    // 只有关闭的是当前的tab，才需要更新key
    if (key === currentKey) {
      console.log('prevActiveKeyRef.current:', prevActiveKeyRef.current, currentKey);
      // 如果关闭的是当前的tab，应该回到上一个tab，如果上一个tab不存在，则回到前一个tab
      const currentKeys = currentComps.map(item => item.key);
      console.error(currentKeys);
      if (currentKeys.includes(prevActiveKeyRef.current)) {
        saveAndUpdateKey(prevActiveKeyRef.current);
      } else {
        const keyIndex = currentKeys.findIndex(itemKey => itemKey === key) || 1;
        saveAndUpdateKey(currentComps[keyIndex - 1].key);
      }
    }

    // 移除key对应的组件
    updateCurrentComps(prev => {
      return prev
        .map(item => {
          if (item.key === key) return null;
          return item;
        })
        .filter(Boolean);
    });
  };

  // 添加新tab
  const addItem = (key, compProps = {}) => {
    if (key === currentKey && Object.keys(compProps).length === 0) return;
    navigate(`${key}`, { state: { ...compProps } });
    const isExisted = currentComps.findIndex(item => item.key === key) > -1;
    const itemToAdd = commonCompsInfo.find(item => item.key === key);
    if (isExisted) {
      // 存在的情况下 传入新的props 并替换
      saveAndUpdateKey(key);
      updateCurrentComps(prev => {
        return prev.map(item => {
          if (item.key === key) return { ...itemToAdd, componentProps: compProps };
          return item;
        });
      });
      return;
    }
    if (itemToAdd) {
      updateCurrentComps(prev => [...prev, itemToAdd]);
      saveAndUpdateKey(itemToAdd.key);
    }
  };

  // 添加已有tab
  const addExistedItem = type => {
    const commonCompsItem = commonCompsInfo.find(item => item.type === type);
    if (!commonCompsItem) return;
    const sameTypeItems = currentComps.filter(item => item.type === type);
    let newItemToAdd = commonCompsItem;
    if (sameTypeItems.length > 0) {
      const newKey = `${commonCompsItem.key}-${compNum}`;
      const newName = `${commonCompsItem.name}-${compNum}`;
      newItemToAdd = { ...commonCompsItem, ...{ key: newKey, name: newName } };
      compNum++;
    }
    updateCurrentComps(prev => [...prev, newItemToAdd]);
    saveAndUpdateKey(newItemToAdd.key);
  };

  // 根据url初始化tab（只执行一次）
  useComponentWillMount(() => {
    // console.log('tabName', tabName);
    if (tabName) {
      addItem(tabName);
    }
  });

  const removeBtn = (
    <Button type='text' onClick={removeItem}>
      <Icon type='close' />
    </Button>
  );

  return (
    <>
      {/* <button type='button' onClick={addItem}>
        增加tab
      </button> */}
      <button type='button' onClick={() => addItem('content1', { test: 1 })}>
        Content1
      </button>
      <button type='button' onClick={() => addItem('content2')}>
        Content2
      </button>
      <button type='button' onClick={() => addItem('content3')}>
        Content3
      </button>
      <p>===============================</p>
      <p>添加新tab：</p>
      <button type='button' onClick={() => addExistedItem('content1')}>
        Content1
      </button>
      <button type='button' onClick={() => addExistedItem('content2')}>
        Content2
      </button>
      <button type='button' onClick={() => addExistedItem('content3')}>
        Content3
      </button>
      {/* Tabs */}
      <TabWrap>
        <Tabs
          type='dynamic'
          noContainer
          activeKey={currentKey}
          onChange={onTabsChange}
          className={classNames({ 'kd-tab-custome': currentKey === commonCompsInfo[0].key })}
        >
          {currentComps.map((comp, index) => {
            if (index === 0) {
              return (
                <TabPane specialPane='left' key={commonCompsInfo[0].key}>
                  <Icon type='workbench' onClick={backHome} style={{ fontSize: '18px' }} />
                </TabPane>
              );
            }
            return <TabPane key={comp.key} tab={comp.name} operations={[removeBtn]} />;
          })}
        </Tabs>
      </TabWrap>
      {/* 组件 */}
      <Suspense fallback={<div>loading...</div>}>
        {currentComps.map(item => {
          return (
            <section key={item.key} style={{ display: currentKey === item.key ? 'block' : 'none' }}>
              <item.component key={item.key} text={item.name} />
            </section>
          );
        })}
      </Suspense>
      {/* <Content1 text='1111' style={{ display: indexToShow === 0 ? 'block' : 'none' }} />
      <Content1 text='2222' style={{ display: indexToShow === 1 ? 'block' : 'none' }} />
      <Content1 text='3333' style={{ display: indexToShow === 2 ? 'block' : 'none' }} /> */}
    </>
  );
}
