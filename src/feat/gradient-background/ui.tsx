import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {palette} from '../../styles/theme';

interface WithGradientBackgroundProps extends PropsWithChildren {}

export const WithGradientBackground: FC<WithGradientBackgroundProps> = ({
  children,
}) => {
  return (
    <LinearGradient colors={palette.gradient} style={styles.gradientWrapper}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    flex: 1,
  },
});
