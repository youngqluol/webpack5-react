import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBar from '../../src/components/HeaderBar';

// describe 描述一组测试
describe('test HeaderBar component render', () => {
  it('test Movebox component render success', () => {
    // renderer.create 模拟 React 渲染组件，并将结果输出为 json 字符串。
    const moveComp = renderer.create(<HeaderBar text='text' />).toJSON();
    // 期望 HeaderBar 匹配生成的快照文件。
    expect(moveComp).toMatchSnapshot();
  });
});
