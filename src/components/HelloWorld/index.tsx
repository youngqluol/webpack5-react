import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import './index.less';
// import logo from '@src/assets/logo.svg';
import { testBabel } from '../../utils';
import { useStores } from '../../store';

interface HelloWorldProps {
  text: string;
}

function HelloWorld(props: HelloWorldProps) {
  const { counterStore } = useStores();
  const { counter, increment } = counterStore;
  return (
    <div className='hello-world' onClick={() => testBabel()}>
      <p className='text-color'>{props.text}</p>
      <Button type='primary'>Primary Button</Button>
      {/* <img src={logo} className='App-logo' alt='logo' /> */}
      <h2>helloWorld counter:{counter}</h2>
      <button type='submit' onClick={e => increment()}>
        +1
      </button>
    </div>
  );
}

export default observer(HelloWorld);
