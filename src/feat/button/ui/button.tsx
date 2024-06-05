import {MotiView, useAnimationState} from 'moti';
import React, {FC, ReactNode} from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {GenericTouchableProps} from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import {palette} from '../../../styles/theme';
import {LoadingSvgAnimation} from './loder';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'solid' | 'ghost';

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

const getVariantStyles = (options: Required<ButtonStylesOptions>) => {
  const {variant} = options;
  const color = options.disabled ? options.disabledColor : options.defaultColor;
  const styles: Record<ButtonVariant, ViewStyle> = {
    solid: {
      backgroundColor: color,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: color,
      borderWidth: 2,
      borderStyle: 'solid',
    },
  };

  return styles[variant];
};

export interface ButtonStyles {
  defaultColor?: string;
  disabledColor?: string;
  pressedColor?: string;
  contentColor?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export interface ButtonProps extends GenericTouchableProps, ButtonStyles {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: string;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  onPressIn,
  onPressOut,
  disabled = false,
  isLoading = false,
  defaultColor = palette.accent,
  disabledColor = palette.accent,
  pressedColor = palette.accentPressed,
  contentColor = palette.foreground,
  style,
  size = 'large',
  variant = 'solid',
  ...rest
}) => {
  const pointState = useAnimationState({
    pressedIn: {
      scale: 1.01,
      backgroundColor: [
        {
          value: variant === 'ghost' ? 'transparent' : pressedColor,
          duration: 100,
        },
      ],
    },
    pressedOut: {
      scale: 1,
      backgroundColor: 'ghost' ? 'transparent' : defaultColor,
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

  const isDisabled = disabled || isLoading;

  const styles = createStyles({
    defaultColor,
    disabledColor,
    contentColor,
    pressedColor,
    disabled: isDisabled,
    size,
    variant,
  });

  return (
    <View style={style}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        {...rest}>
        <MotiView state={pointState} style={styles.buttonContent}>
          {isLoading && <LoadingSvgAnimation style={styles.loadingSvg} />}
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
      overflow: 'hidden',
      ...getVariantStyles(options),
    },
    textContent: {
      ...textSizeStyles[options.size],
      color:
        options.variant === 'ghost'
          ? options.defaultColor
          : options.contentColor,
      fontWeight: options.variant === 'ghost' ? '400' : '800',
      letterSpacing: 1.1,
      position: 'absolute',
      left: 0,
      right: 0,
      textAlign: 'center',
    },
    loadingSvg: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
  });
