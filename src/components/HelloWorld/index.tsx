import './index.less';
import logo from '@src/assets/logo.svg';

interface HelloWorldProps {
  text: string;
}

function HelloWorld(props: HelloWorldProps) {
  return (
    <div className='hello-world'>
      <p className='text-color'>{props.text}</p>
      <img src={logo} className='App-logo' alt='logo' />
    </div>
  );
}

export default HelloWorld;
