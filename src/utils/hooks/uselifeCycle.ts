import { useRef, useEffect } from 'react';

// mock componentWillMount
export const useComponentWillMount = (func: () => any) => {
  const mountRef = useRef(true);

  useEffect(() => {
    if (!mountRef.current) {
      func();
      mountRef.current = true;
    }
    return () => {
      mountRef.current = false;
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
};
