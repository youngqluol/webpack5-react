import styles from './index.less';

interface HeaderBarProps {
  text: string
}

const HeaderBar = (props: HeaderBarProps) => {
  return (
    <div className={styles.textColor}>{props.text}</div>
  )
}

export default HeaderBar;