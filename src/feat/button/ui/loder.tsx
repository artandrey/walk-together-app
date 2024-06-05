import React from 'react';
import Svg, {Defs, Stop, Rect, LinearGradient} from 'react-native-svg';
import {MotiView} from 'moti';
import {ViewStyle, StyleSheet} from 'react-native';
import {palette} from '../../../styles/theme';

interface LoadingSvgAnimationProps {
  gradientForegroundStyle?: {
    startColor?: string;
    endColor?: string;
    startOpacity?: number;
    endOpacity?: number;
  };
  style?: ViewStyle;
}

export const LoadingSvgAnimation: React.FC<LoadingSvgAnimationProps> = ({
  gradientForegroundStyle = {
    startColor: palette.accent,
    endColor: palette.accentDisabled,
    startOpacity: 0,
    endOpacity: 0.5,
  },
  style = {},
}) => {
  return (
    <MotiView
      from={{opacity: 0}}
      animate={{opacity: 1}}
      style={[styles.wrapper, style]}>
      <MotiView
        from={{translateX: 100}}
        animate={{translateX: -100}}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
        style={styles.sliding}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop
                offset="0%"
                stopColor={gradientForegroundStyle.startColor}
                stopOpacity={gradientForegroundStyle.startOpacity}
              />
              <Stop
                offset="50%"
                stopColor={gradientForegroundStyle.endColor}
                stopOpacity={gradientForegroundStyle.endOpacity}
              />
              <Stop
                offset="100%"
                stopColor={gradientForegroundStyle.startColor}
                stopOpacity={gradientForegroundStyle.startOpacity}
              />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </MotiView>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  wrapper: {height: '100%', overflow: 'hidden'},
  sliding: {
    position: 'absolute',
    right: '-50%',
    width: '200%',
    height: '100%',
  },
});
