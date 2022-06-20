import React from 'react';
import { observer } from 'mobx-react';
import { injectStores } from '@src/store';

type propType = {
  text?: string;
};

type stateType = {
  testText: string;
};

// for test mobx's usage in class component
@observer
@injectStores
class TestClassComp extends React.Component<propType, stateType> {
  constructor(props) {
    super(props);
    this.state = {
      testText: 'texttext',
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.testText}</p>
        <p> {this.props.text || ''}</p>
        <p>{this.context.counterStore.count}</p>
      </div>
    );
  }
}

export default TestClassComp;
