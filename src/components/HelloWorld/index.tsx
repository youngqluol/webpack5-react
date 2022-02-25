import styles from './index.less'; // TODO

interface HelloWorldProps {
  text: string
}

const HelloWorld = (props: HelloWorldProps) => {
  return (
    <div className={styles.textColor}>{props.text}</div>
  )
}

export default HelloWorld;