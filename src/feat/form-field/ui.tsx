import React, {FC, useEffect, useRef} from 'react';
import {Input, InputProps} from '../input';
import {StyleSheet, Text} from 'react-native';
import {palette} from '../../styles/theme';
import {MotiView, useAnimationState} from 'moti';

export interface FormFieldProps extends InputProps {
  label?: string;
  errorMessage?: string;
  isError?: boolean;
}

export const FormField: FC<FormFieldProps> = ({
  label,
  errorMessage,
  isError = false,
  value,
  ...otherProps
}) => {
  const shake = useAnimationState({
    from: {
      translateX: 0,
    },
    shake: {
      translateX: [-3, 3, -2, 2, 0],
    },
  });

  const previousErrorStateRef = useRef(isError);

  useEffect(() => {
    if (isError && !previousErrorStateRef.current) {
      shake.transitionTo('shake');
    } else {
      shake.transitionTo('from');
    }
    previousErrorStateRef.current = isError;
  }, [isError, shake, value]);

  const styles = createStyles(isError);
  return (
    <MotiView
      transition={{duration: 100, type: 'timing'}}
      state={shake}
      style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Input value={value} isError={isError} {...otherProps} />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </MotiView>
  );
};

const createStyles = (isError: boolean) =>
  StyleSheet.create({
    wrapper: {
      paddingBottom: 16,
    },
    label: {
      fontSize: 20,
      marginBottom: 10,
      color: isError ? palette.error : palette.accent,
    },
    errorText: {
      fontSize: 14,
      color: palette.error,
      position: 'absolute',
      bottom: -5,
    },
  });
