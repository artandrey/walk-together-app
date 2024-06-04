import React, {FC, PropsWithChildren} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import AnimatedCircularProgress, {
  AnimatedCircularProgressProps,
} from './circular-progress';

interface CircularProgressButtonProps
  extends PropsWithChildren,
    TouchableWithoutFeedbackProps {
  progressBar: AnimatedCircularProgressProps;
  padding?: number;
  color: string;
}

export const CircularProgressButton: FC<CircularProgressButtonProps> = ({
  children,
  progressBar,
  padding = 0,
  color,
  ...rest
}) => {
  return (
    <TouchableWithoutFeedback {...rest}>
      <View style={styles(progressBar.radius, padding, color).wrapper}>
        <View style={styles(progressBar.radius, padding, color).absoluteCenter}>
          {children}
        </View>
        <AnimatedCircularProgress {...progressBar} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = (radius: number, padding: number, color: string) => {
  const size = radius * 2;
  const innerSize = size - padding;

  return StyleSheet.create({
    absoluteCenter: {
      width: innerSize,
      height: innerSize,
      position: 'absolute',
      top: (size - innerSize) / 2,
      left: (size - innerSize) / 2,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: innerSize,
      backgroundColor: color,
    },
    wrapper: {
      width: size,
      height: size,
    },
  });
};
