import React, {ComponentType, FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {AnimatePresence, Text} from 'moti';
import {SvgProps} from 'react-native-svg';
import {CarouselProgress} from './carousel-progress';

export interface CarouselSlide {
  view: ComponentType<SvgProps>;
  text: string;
}

export interface CarouselProps {
  currentIndex: number;
  steps: CarouselSlide[];
}

export const Carousel: FC<CarouselProps> = ({steps, currentIndex}) => {
  const currentStep = steps[currentIndex];
  const SvgView = currentStep.view;
  return (
    <View style={styles.container}>
      <View style={styles.svgViewContainer}>{<SvgView />}</View>
      <CarouselProgress count={steps.length} currentIndex={currentIndex} />
      <AnimatePresence exitBeforeEnter>
        <Text
          from={{opacity: 0, top: 10}}
          animate={{opacity: 1, top: 0}}
          exit={{opacity: 0, top: 10}}
          key={`step_${currentIndex}`}
          style={styles.text}>
          {currentStep.text}
        </Text>
      </AnimatePresence>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 28,
    width: 300,
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1.1,
    lineHeight: 20,
    fontWeight: '400',
  },
});
