import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {palette} from '../../styles/theme';

export interface DashSeparatedTextProps extends ViewProps {
  children: string;
  color?: string;
  textStyle?: TextStyle;
}

export const DashSeparatedText: FC<DashSeparatedTextProps> = ({
  children,
  color,
  textStyle,
  style,
  ...rest
}) => {
  const styles = createStyles(textStyle, style as ViewStyle, color);

  return (
    <View style={styles.wrapper} {...rest}>
      <View style={styles.dash} />
      <Text style={styles.text}>{children}</Text>
      <View style={styles.dash} />
    </View>
  );
};

const createStyles = (
  textStyle?: TextStyle,
  wrapperStyles?: ViewStyle,
  color: string = palette.textSecondary,
) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 7,
      ...wrapperStyles,
    },
    text: {fontSize: 16, ...textStyle, color},
    dash: {
      flex: 1,
      height: 2,
      backgroundColor: color,
    },
  });
