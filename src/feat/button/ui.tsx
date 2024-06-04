import {MotiView, useAnimationState} from 'moti';
import React, {FC, ReactNode} from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {GenericTouchableProps} from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import {palette} from '../../styles/theme';

export type ButtonSize = 'small' | 'medium' | 'large';

const buttonSizeStyles: Record<ButtonSize, ViewStyle> = {
  small: {
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 34,
  },
  medium: {
    paddingHorizontal: 16,
    height: 54,
    borderRadius: 54,
  },
  large: {
    paddingHorizontal: 20,
    height: 64,
    borderRadius: 64,
  },
};

const textSizeStyles: Record<ButtonSize, TextStyle> = {
  small: {
    fontSize: 16,
  },
  medium: {
    fontSize: 20,
  },
  large: {
    fontSize: 24,
  },
};

export interface ButtonStyles {
  defaultColor?: string;
  disabledColor?: string;
  pressedColor?: string;
  contentColor?: string;
  size?: ButtonSize;
}

export interface ButtonProps extends GenericTouchableProps, ButtonStyles {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  onPressIn,
  onPressOut,
  disabled = false,
  defaultColor = palette.accent,
  disabledColor = palette.accent,
  pressedColor = palette.accentPressed,
  contentColor = palette.foreground,
  style,
  size = 'large',
  ...rest
}) => {
  const pointState = useAnimationState({
    pressedIn: {
      scale: 1.01,
      backgroundColor: [{value: pressedColor, duration: 100}],
    },
    pressedOut: {
      scale: 1,
      backgroundColor: defaultColor,
    },
  });

  const handlePressIn = () => {
    pointState.transitionTo('pressedIn');
    onPressIn?.();
  };

  const handlePressOut = () => {
    pointState.transitionTo('pressedOut');
    onPressOut?.();
  };

  const styles = createStyles({
    defaultColor,
    disabledColor,
    contentColor,
    pressedColor,
    disabled,
    size,
  });

  return (
    <View style={style}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        {...rest}>
        <MotiView state={pointState} style={styles.buttonContent}>
          <View>{leftIcon}</View>
          <Text style={styles.textContent}>{children}</Text>
          <View>{rightIcon}</View>
        </MotiView>
      </TouchableWithoutFeedback>
    </View>
  );
};

interface ButtonStylesOptions extends ButtonStyles {
  disabled?: boolean;
}

const createStyles = (options: Required<ButtonStylesOptions>) =>
  StyleSheet.create({
    buttonContent: {
      ...buttonSizeStyles[options.size],
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: options.disabled
        ? options.disabledColor
        : options.defaultColor,
    },
    textContent: {
      ...textSizeStyles[options.size],
      color: options.contentColor,
      fontWeight: '800',
      letterSpacing: 1.1,
      position: 'absolute',
      left: 0,
      right: 0,
      textAlign: 'center',
    },
  });
