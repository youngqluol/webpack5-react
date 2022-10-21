import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Content1({
  style = {},
  text = '',
  ...reset
}: {
  style?: React.CSSProperties;
  text?: string;
  [prop: string]: any;
}) {
  const location = useLocation();

  useEffect(() => {
    // console.error('content1 effect', reset);
  }, [reset, location]);

  return (
    <div style={{ ...style }}>
      <h1>{text}</h1>
      <input type='text' />
      <p>{JSON.stringify(location.state)}</p>
      {/* <p>{JSON.stringify(reset)}</p> */}
    </div>
  );
}
