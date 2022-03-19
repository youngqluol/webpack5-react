import HeaderStyle from './index.module.less';

interface HeaderBarProps {
  text: string;
}

function HeaderBar(props: HeaderBarProps) {
  return (
    <div className={HeaderStyle.headerBar}>
      <p className={HeaderStyle.textColor}>{props.text}</p>
    </div>
  );
}

export default HeaderBar;
