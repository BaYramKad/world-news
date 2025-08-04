import { useEffect, useState } from 'react';
import { SlidesType } from './sourse';

interface CircleProps {
  values: SlidesType[];
  updateCurrentSlide: (value: number) => void;
  size?: number;
  radius?: number;
  defaultIndex?: number;
}

export const SwiperCircle = ({ values, size = 500, radius = 200, defaultIndex, updateCurrentSlide }: CircleProps) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const [rotation, setRotation] = useState(0);

  const radToDeg = (rad: number) => (rad * 180) / Math.PI;

  const nextSlide = (index: number) => {
    const elementAngleRad = ((2 * Math.PI) / values.length) * index - Math.PI / 2;
    const elementAngleDeg = radToDeg(elementAngleRad);

    const currentAngleWithRotation = (elementAngleDeg + rotation) % 360;

    const targetAngle = -65;

    let delta = targetAngle - currentAngleWithRotation;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    updateCurrentSlide(index);
    setRotation((prev) => prev + delta);
  };

  useEffect(() => {
    if (defaultIndex !== undefined && defaultIndex !== null) {
      nextSlide(defaultIndex);
    }
  }, [defaultIndex]);

  return (
    <svg width={size} height={size}>
      <g width={size} height={size} transform={`rotate(${rotation})`} style={{ transition: 'transform 0.5s ease-in-out', transformOrigin: 'center' }}>
        <circle cx={centerX} cy={centerY} r={radius} strokeWidth={1} stroke='var(--border-color)' fill='transparent' />
        {values.map((value, index) => {
          const angle = ((2 * Math.PI) / values.length) * index - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const isHovered = defaultIndex === index;
          return (
            <g
              className={`circle-tag ${isHovered && 'active-tag'}`}
              key={index}
              onClick={() => {
                nextSlide(index);
              }}
              style={{ cursor: 'pointer', zIndex: 10 }}
            >
              <circle cx={x} cy={y} stroke='var(--text-color)' style={{ transition: 'r 0.2s ease, fill 0.2s ease' }} />

              <text className='circle-text' x={x} y={y} textAnchor='middle' transform={`rotate(${-rotation} ${x} ${y})`} dominantBaseline='middle' fontSize='16' fill='black'>
                <tspan x={x} dy='0'>
                  {value.id}
                </tspan>
                <tspan x={x} dx='5.3rem'>
                  {isHovered && value.title}
                </tspan>
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};
