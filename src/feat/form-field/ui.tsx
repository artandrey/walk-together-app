import React, {FC, useEffect, useRef} from 'react';
import {Input, InputProps} from '../input';
import {StyleSheet} from 'react-native';
import {palette} from '../../styles/theme';
import {MotiText, MotiView, useAnimationState} from 'moti';

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
  style,
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
      style={[styles.wrapper, style]}>
      {label && (
        <MotiText
          from={{opacity: 0, translateY: -4}}
          animate={{opacity: 1, translateY: 0}}
          style={styles.label}>
          {label}
        </MotiText>
      )}
      <Input value={value} isError={isError} {...otherProps} />
      {errorMessage && (
        <MotiText
          from={{opacity: 0, translateY: -4}}
          animate={{opacity: 1, translateY: 0}}
          style={styles.errorText}>
          {errorMessage}
        </MotiText>
      )}
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
