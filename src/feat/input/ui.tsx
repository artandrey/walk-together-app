import React, {FC, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import {palette} from '../../styles/theme';

export interface InputProps extends TextInputProps {
  isError?: boolean;
}

export const Input: FC<InputProps> = ({
  isError = false,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    onFocus?.(event);
    setIsFocused(true);
  };

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.(event);
    setIsFocused(false);
  };

  const styles = createStyles(
    isError,
    isFocused ? palette.accent : palette.textSecondary,
  );
  return (
    <View style={styles.wrapper}>
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
        placeholderTextColor={palette.textSecondary}
        {...rest}
      />
    </View>
  );
};

const createStyles = (isError: boolean, currentBorderColor: string) =>
  StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      height: 58,
      paddingHorizontal: 25,
      backgroundColor: palette.foreground,
      borderColor: isError ? palette.error : currentBorderColor,
      borderWidth: 1,
      borderRadius: 58,
    },
    input: {
      fontSize: 16,
      color: palette.textMain,
    },
  });
