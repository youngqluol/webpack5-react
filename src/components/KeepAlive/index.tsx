import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Icon, Button } from '@kdcloudjs/kdesign';
import { usePrevious } from '@src/utils/hooks/usePrevios';
// import Content1 from '../MenuTabs/tabComponents/Content1';

const { TabPane } = Tabs;

let compNum = 1;

// 组件信息
const commonCompsInfo = [
  {
    type: 'content1',
    key: 'content1',
    name: 'content1',
    component: lazy(() => import('../MenuTabs/tabComponents/Content1')),
  },
  {
    type: 'content2',
    key: 'content2',
    name: 'content2',
    component: lazy(() => import('../MenuTabs/tabComponents/Content2')),
  },
  {
    type: 'content3',
    key: 'content3',
    name: 'content3',
    component: lazy(() => import('../MenuTabs/tabComponents/Content3')),
  },
];

export default function KeepAlive() {
  const [currentKey, updateCurrentKey] = useState(commonCompsInfo[0].key);
  const [currentComps, updateCurrentComps] = useState(commonCompsInfo.slice(0, 1));

  const previosKey = usePrevious(currentKey);
  const prevActiveKeyRef = useRef(commonCompsInfo[0].key); // 保存上一个tab key
  useEffect(() => {
    // prevActiveKeyRef.current = currentKey;
    // console.error('currentKey', currentKey);
    // console.error('previosKey', previosKey);
    prevActiveKeyRef.current = previosKey;
  });

  const navigate = useNavigate();

  const backHome = e => {
    e.stopPropagation();
    updateCurrentKey(commonCompsInfo[0].key);
  };

  const onTabsChange = key => {
    // console.error('onTabsChange:', key);
    updateCurrentKey(key);
  };

  // operations
  const removeItem = key => {
    // console.log(key);
    if (typeof key !== 'string') {
      return;
    }
    // if (key === currentKey) {
    //   // 如果关闭的是当前的tab，那回到上一个tab
    //   console.log('prevActiveKeyRef.current:', prevActiveKeyRef.current, currentKey);
    //   updateCurrentKey(prevActiveKeyRef.current);
    // }
    console.error('previosKey', prevActiveKeyRef.current);
    updateCurrentKey(prevActiveKeyRef.current);

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
  const addItem = key => {
    if (key === currentKey) return;
    navigate(`?tabName=${key}`);
    const isExisted = currentComps.findIndex(item => item.key === key) > -1;
    if (isExisted) {
      updateCurrentKey(key);
      return;
    }
    const itemToAdd = commonCompsInfo.find(item => item.key === key);
    if (itemToAdd) {
      updateCurrentComps(prev => [...prev, itemToAdd]);
      updateCurrentKey(itemToAdd.key);
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
    updateCurrentKey(newItemToAdd.key);
  };

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
      <button type='button' onClick={() => addItem('content1')}>
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
      <Tabs type='dynamic' noContainer defaultActiveKey='0' activeKey={currentKey} onChange={onTabsChange}>
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
