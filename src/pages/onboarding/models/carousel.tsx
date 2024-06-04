import {useCallback, useState} from 'react';

export interface CarouselStateProps {
  itemsCount: number;
  startIndex?: number;
}

export const useCarouselState = (stateProps: CarouselStateProps) => {
  const [currentIndex, setCurrentIndex] = useState(stateProps.startIndex ?? 0);

  const incrementIndex = useCallback(
    (incrementBy: number) => {
      setCurrentIndex(index => {
        const updatedValue = index + incrementBy;
        if (updatedValue < 0 || updatedValue > stateProps.itemsCount - 1) {
          return 0;
        }
        return updatedValue;
      });
    },
    [setCurrentIndex, stateProps.itemsCount],
  );

  const back = useCallback(() => {
    incrementIndex(-1);
  }, [incrementIndex]);

  const next = useCallback(() => {
    incrementIndex(1);
  }, [incrementIndex]);

  const canGoNext = currentIndex < stateProps.itemsCount - 1;

  return {back, next, currentIndex, canGoNext};
};
