import { useEffect } from 'react';

export default function Content1({ style = {}, text = '' }: { style?: React.CSSProperties; text?: string }) {
  useEffect(() => {
    // console.error('content3 effect');
  }, []);

  return (
    <div style={{ ...style }}>
      <h1>{text}</h1>
      <input type='text' />
    </div>
  );
}
