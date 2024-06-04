import React from 'react';

import {View} from 'moti';
import {StyleSheet} from 'react-native';
import {palette} from '../../../styles/theme';

interface CarouselProgressProps {
  count: number;
  currentIndex: number;
}

export const CarouselProgress: React.FC<CarouselProgressProps> = ({
  count,
  currentIndex,
}) => {
  const pills = Array.from({length: count}, (_, index) => (
    <View
      animate={{width: 8, height: index === currentIndex ? 18 : 8}}
      key={index}
      style={[styles.pill]}
    />
  ));

  return <View style={styles.container}>{pills}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  pill: {
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: palette.textSecondary,
  },
});
