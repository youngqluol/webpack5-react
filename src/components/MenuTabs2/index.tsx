import React from 'react';
import { Tabs, Button, Icon } from '@kdcloudjs/kdesign';
import Content2 from '../MenuTabs/tabComponents/Content2';
import Content1 from '../MenuTabs/tabComponents/Content1';

class MenuTabs2 extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      panes: [
        { name: 'TabPane1', value: '1' },
        { name: 'TabPane2', value: '2' },
        { name: 'TabPane3', value: '3' },
        { name: 'TabPane4', value: '4' },
      ],
      activeKey: 1,
      newTabIndex: 0,
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.backHome = this.backHome.bind(this);
    this.setActive = this.setActive.bind(this);
    this.closeTrigger = this.closeTrigger.bind(this);
    this.closeOther = this.closeOther.bind(this);
  }

  setActive(key) {
    this.setState({
      activeKey: key,
    });
  }

  add() {
    const { panes, newTabIndex } = this.state;
    const activeKey = `newTab${newTabIndex + 1}`;
    const newPanes = [...panes];
    newPanes.push({
      name: `new tab${newTabIndex}`,
      value: activeKey,
    });
    this.setState({
      panes: newPanes,
      activeKey,
      newTabIndex: newTabIndex + 1,
    });
  }

  remove(target) {
    const newPanes = this.state.panes.filter(pane => {
      return String(pane.value) !== String(target);
    });
    this.setState({
      panes: newPanes,
      activeKey: (newPanes[0] && newPanes[0].value) || 0,
    });
  }

  backHome() {
    console.log(111);

    this.setState({
      activeKey: '',
    });
  }

  closeOther(key) {
    const newPane = this.state.panes.find(pane => {
      return String(pane.value) === String(key);
    });
    this.setState({
      panes: [newPane],
      activeKey: (newPane && newPane.value) || 0,
    });
  }

  closeTrigger(key) {
    console.log('click key ==>', key);
    const newPanes = this.state.panes.filter(pane => {
      return String(pane.value) !== String(key);
    });
    this.setState({
      panes: newPanes,
      activeKey: (newPanes[0] && newPanes[0].value) || 0,
    });
  }

  render() {
    const removeBtn = (
      <Button type='text' onClick={this.remove}>
        <Icon type='close' />
      </Button>
    );
    return (
      <div>
        <Button type='primary' onClick={this.add}>
          新建页签
        </Button>
        <Tabs type='dynamic' activeKey={this.state.activeKey} onChange={this.setActive}>
          <Tabs.TabPane specialPane='left'>
            <Icon type='workbench' onClick={this.backHome} />
          </Tabs.TabPane>
          {this.state.panes.map((pane, index) => {
            return (
              <Tabs.TabPane key={pane.value} tab={pane.name} operations={[removeBtn]}>
                {index % 2 === 1 ? <Content2 /> : <Content1 />}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

export default MenuTabs2;
