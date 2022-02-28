import './index.less';

interface HeaderBarProps {
  text: string;
}

function HeaderBar(props: HeaderBarProps) {
  return (
    <div className='header-bar'>
      <p className='text-color'>{props.text}</p>
    </div>
  );
}

export default HeaderBar;
