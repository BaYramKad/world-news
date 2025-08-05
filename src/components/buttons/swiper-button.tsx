import Prev from '../../assets/prev.svg';
import Next from '../../assets/next.svg';

import './buttons.scss';

export type StateOfTypeButton = 'next' | 'prev';

interface SwiperButtonProps {
  type: StateOfTypeButton;
  handleSlide: (type: StateOfTypeButton) => void;
  isDisabled: boolean;
}

const SwiperButton = ({ type, handleSlide, isDisabled }: SwiperButtonProps) => {
  const buttonsType = {
    next: <Next className='next-arrow' width={50} height={50} />,
    prev: <Prev className='prev-arrow' width={50} height={50} />,
  };
  return (
    <button disabled={isDisabled} className='swiper-button' onClick={() => handleSlide(type)}>
      {buttonsType[type]}
    </button>
  );
};

export default SwiperButton;
