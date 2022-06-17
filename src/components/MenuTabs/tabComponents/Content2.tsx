import { useEffect } from 'react';

export default function Content2() {
  useEffect(() => {
    console.error('content2 effect');
  }, []);

  return <input type='text' />;
}
