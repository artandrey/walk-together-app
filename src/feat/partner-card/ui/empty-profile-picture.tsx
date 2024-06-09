import React, {FC, forwardRef} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {palette} from '../../../styles/theme';

export interface EmptyProfilePictureProps {
  style?: ViewStyle;
}

export const EmptyProfilePicture: FC<EmptyProfilePictureProps> = forwardRef<
  View,
  EmptyProfilePictureProps
>(({style}, ref) => {
  return (
    <View ref={ref} style={[styles.wrapper, style]}>
      <Text style={styles.text}>?</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.accent,
    borderRadius: 9999,
  },
  text: {
    fontSize: 40,
    color: palette.foreground,
  },
});
