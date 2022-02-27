import './index.less';

interface HelloWorldProps {
  text: string;
}

var b = 2;
var a = 1;
if (a == 2) {
}

const HelloWorld = (props: HelloWorldProps) => {
  return (
    <div className={'hello-world'}>
      <p className={'text-color'}>{props.text}</p>
    </div>
  );
};

export default HelloWorld;
