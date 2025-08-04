import { useRef } from 'react';

import { SwiperSlide, Swiper } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import { NewsT } from '../../shared/sourse';
import SwiperButtonsContainer from '../buttons/swiper-buttons-container';

import { SwiperType } from '../types/swaper-types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface NewsProps {
  news: NewsT[];
  activeIndex: number;
  isMobile: boolean;
  titleNews: string;
}

const News = ({ news, activeIndex, isMobile, titleNews }: NewsProps) => {
  const swiperNewsRef = useRef<SwiperType>(null);
  const currentYearsNews = news.find((_, i) => i === activeIndex);
  return (
    <div className='swiper-news-wrapper'>
      {isMobile && <h2 className='swiper-news-title'>{titleNews}</h2>}
      <Swiper
        className='swiper-news'
        freeMode={isMobile}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        slidesPerView={isMobile ? 'auto' : 3}
        modules={[FreeMode]}
        onSwiper={(swiper) => (swiperNewsRef.current = swiper)}
      >
        {currentYearsNews?.fields.map((item) => (
          <SwiperSlide>
            <div className='swiper-news-slide'>
              <h2 className='year'>{item.year}</h2>
              <p className='year-description'>{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {!isMobile && <SwiperButtonsContainer className='swiper-news-buttons' swiperRef={swiperNewsRef} />}
    </div>
  );
};

export default News;
