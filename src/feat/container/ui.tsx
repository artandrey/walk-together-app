import React, {FC} from 'react';
import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native';

export interface ContainerProps extends ViewProps {}

export const Container: FC<ContainerProps> = ({style, ...rest}) => {
  return <View {...rest} style={createStyles(style as ViewStyle).container} />;
};

const createStyles = (containerStyles?: ViewStyle) =>
  StyleSheet.create({
    container: {
      minHeight: 700,
      paddingHorizontal: 30,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 60,
      ...containerStyles,
    },
  });
