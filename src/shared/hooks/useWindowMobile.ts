import { useEffect, useState } from 'react';

export function useWindowMobile(x: number): boolean {
  const [isMoreThan, setIsMoreThan] = useState(() => window.innerWidth < x);

  useEffect(() => {
    function handleResize() {
      setIsMoreThan(window.innerWidth < x);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [x]);

  return isMoreThan;
}
