import { useEffect, useState } from 'react';

export function useWindowMobile(x: number): boolean {
  const [isLessThen, setLessThan] = useState(() => window.innerWidth < x);

  useEffect(() => {
    function handleResize() {
      setLessThan(window.innerWidth < x);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [x]);

  return isLessThen;
}
