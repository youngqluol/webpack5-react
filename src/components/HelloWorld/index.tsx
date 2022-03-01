import './index.less';
import logo from '@src/assets/logo.svg';
import { testBabel } from '../../utils';

interface HelloWorldProps {
  text: string;
}

function HelloWorld(props: HelloWorldProps) {
  return (
    <div className='hello-world' onClick={() => testBabel()}>
      <p className='text-color'>{props.text}</p>
      <img src={logo} className='App-logo' alt='logo' />
    </div>
  );
}

export default HelloWorld;
