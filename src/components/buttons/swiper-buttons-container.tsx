import React, { useEffect, useState } from 'react';

import SwiperButon, { StateOfTypeButton } from './swiper-button';
import { SwiperType } from '../types/swaper-types';

interface SwiperButtonsContainerProps {
  swiperRef: React.RefObject<SwiperType | null>;
  className?: string;
}

const SwiperButtonsContainer = ({ swiperRef, className = 'swiper-buttons-container' }: SwiperButtonsContainerProps) => {
  const [isDisabledPrevBtn, setDisabledPrevBtn] = useState(false);
  const [isDisabledNextBtn, setDisabledNextBtn] = useState(false);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;

    const updateButtons = () => {
      setDisabledPrevBtn(swiper.isBeginning);
      setDisabledNextBtn(swiper.isEnd);
    };

    updateButtons();

    swiper.on('slideChange', updateButtons);
    return () => {
      swiper.off('slideChange', updateButtons);
    };
  }, []);

  const handleSlide = (type: StateOfTypeButton) => {
    if (type === 'next') {
      swiperRef.current?.slideNext();
    } else {
      swiperRef.current?.slidePrev();
    }
  };

  return (
    <div className={className}>
      <SwiperButon type='prev' handleSlide={handleSlide} isDisabled={isDisabledPrevBtn} />
      <SwiperButon type='next' handleSlide={handleSlide} isDisabled={isDisabledNextBtn} />
    </div>
  );
};

export default SwiperButtonsContainer;
