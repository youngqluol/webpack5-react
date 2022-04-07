import React from 'react';
import { observer } from 'mobx-react';
import { injectStores } from '@src/store';

type propType = {
  text?: string;
};

type stateType = {
  testText: string;
};

@observer
@injectStores
class NoMatch extends React.Component<propType, stateType> {
  constructor(props) {
    super(props);
    this.state = {
      testText: 'texttext',
    };
  }

  render() {
    return (
      <div>
        {this.state.testText}
        {this.props.text || ''}
      </div>
    );
  }
}

export default NoMatch;
