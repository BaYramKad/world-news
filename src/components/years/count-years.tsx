import { useEffect, useRef, useState } from 'react';
import { SlidesType } from '../../shared/sourse';

import './years.scss';

interface CountYearsProps {
  currentSlide: SlidesType;
}

function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(Number(value));
  const startValue = useRef(Number(value));
  const startTime = useRef(0);

  useEffect(() => {
    startValue.current = displayValue;
    startTime.current = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const newValue = startValue.current + (Number(value) - startValue.current) * progress;
      setDisplayValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{Math.round(displayValue)}</span>;
}

export const CountYears = ({ currentSlide }: CountYearsProps) => {
  return (
    <div className='years-container'>
      <div className='year-start'>
        <AnimatedNumber value={currentSlide.yearStart} />
      </div>
      <div className='year-end'>
        <AnimatedNumber value={currentSlide.yearEnd} />
      </div>
    </div>
  );
};

export default CountYears;
