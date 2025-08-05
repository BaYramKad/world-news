import { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import CountYears from './years/count-years';
import Title from './title';
import News from './news-container/news';
import SwiperButtonsContainer from './buttons/swiper-buttons-container';
import { SwiperCircle } from '../shared/swiper-circle';

import { news, slides, SlidesType } from '../shared/sourse';
import { useWindowMobile } from '../shared/hooks/useWindowMobile';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const WorldHistory = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<SlidesType>(slides[0]);
  const isMobile = useWindowMobile(1000);

  const swiperRef = useRef<SwiperType>(null);
  const convertIndex = (num: number) => (num > 9 ? num : `0${num + 1}`);

  return (
    <div className={`main ${isMobile ? 'mobile-device' : ''}`}>
      <Title />
      <div className='main-circle-swiper'>
        <SwiperCircle
          values={slides}
          defaultIndex={activeIndex}
          updateCurrentSlide={(idx: number) => {
            const currentSlideObj = slides.find((_, i) => i === idx);
            if (currentSlideObj) {
              setCurrentSlide(currentSlideObj);
            }
            swiperRef.current?.slideTo(idx);
          }}
        />
      </div>
      <CountYears currentSlide={currentSlide} />
      <Swiper
        navigation={{ enabled: true }}
        slidesPerView={1}
        pagination={{ clickable: isMobile }}
        onSlideChange={(slide) => {
          setActiveIndex(slide.activeIndex);
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slides.map((item) => (
          <SwiperSlide>{item.title}</SwiperSlide>
        ))}
      </Swiper>

      <div className='main-navigate-container'>
        <div className='swiper-navigate'>
          <div className='swiper-pagination-fraction'>
            {convertIndex(activeIndex)}/{convertIndex(slides.length - 1)}
          </div>
          <SwiperButtonsContainer swiperRef={swiperRef} />
        </div>
        <News news={news} activeIndex={activeIndex} isMobile={isMobile} titleNews={currentSlide.title} />
      </div>
    </div>
  );
};

export default WorldHistory;
