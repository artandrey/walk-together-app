import React, {FC, LegacyRef, forwardRef} from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {palette} from '../../styles/theme';

export interface HeadingTextProps extends TextProps {
  ref?: LegacyRef<Text>;
}

export const HeadingText: FC<HeadingTextProps> = forwardRef(
  ({style, ...rest}, ref) => {
    return (
      <Text
        ref={ref}
        style={createStyles(style as TextStyle).headerText}
        {...rest}
      />
    );
  },
);

const createStyles = (styles: TextStyle) =>
  StyleSheet.create({
    headerText: {
      width: 300,
      marginTop: 90,
      textAlign: 'center',
      fontSize: 36,
      letterSpacing: 1.1,
      fontWeight: 'bold',
      color: palette.textMain,
      ...styles,
    },
  });
