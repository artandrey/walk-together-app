import React from 'react';
import {PixelRatio, StyleSheet} from 'react-native';
import {Circle, Svg} from 'react-native-svg';

import {motifySvg} from 'moti/svg';

export interface AnimatedCircularProgressProps {
  radius: number;
  color: string;
  percentage: number;
  borderWidth: number;
  duration?: number;
}

const AnimatedCircle = motifySvg(Circle)();

const AnimatedCircularProgress: React.FC<AnimatedCircularProgressProps> = ({
  radius,
  color,
  percentage,
  borderWidth,
  duration = 500,
}) => {
  const loaderRadius = PixelRatio.roundToNearestPixel(radius);
  const innerCircleRadii = loaderRadius - borderWidth / 2;

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <Svg style={styles(radius).svg}>
      <AnimatedCircle
        animate={{strokeDashoffset}}
        transition={{duration, type: 'timing'}}
        cx={radius}
        cy={radius}
        fill="transparent"
        r={innerCircleRadii}
        stroke={color}
        strokeWidth={borderWidth}
        strokeDashoffset={strokeDashoffset}
        strokeDasharray={circumference}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const styles = (radius: number) =>
  StyleSheet.create({
    svg: {
      width: 2 * radius,
      height: 2 * radius,
    },
  });

export default AnimatedCircularProgress;
