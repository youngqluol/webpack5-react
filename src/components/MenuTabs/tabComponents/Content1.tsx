import { useEffect } from 'react';

export default function Content1() {
  useEffect(() => {
    console.error('content1 effect');
  }, []);

  return <input type='text' />;
}
