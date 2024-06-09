import React, {FC, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, ViewStyle} from 'react-native';
import {FormField} from '../../form-field';
import {useDebouncedCallback} from 'use-debounce';
import {zodResolver} from '@hookform/resolvers/zod';
import {ProfileSearchFormValues, formValidationSchema} from '../models';

export interface ProfileSign {
  nickname: string;
  code: number;
}

export interface ProfileSearchFormProps {
  onProfileSignEnter?: (profileSign: ProfileSign) => void;
  handleReEnter?: () => void;
  errorMessage?: string;
  style?: ViewStyle;
}

export const ProfileSearchForm: FC<ProfileSearchFormProps> = ({
  onProfileSignEnter: onProfileEnter,
  handleReEnter,
  errorMessage,
  style,
}) => {
  const form = useForm<ProfileSearchFormValues>({
    resolver: zodResolver(formValidationSchema),
    reValidateMode: 'onSubmit',
  });

  const {control, handleSubmit, setError} = form;

  useEffect(() => {
    if (errorMessage) {
      setError('profileSign', {message: errorMessage});
    }
  }, [errorMessage, setError]);

  const handleProfileEnter = (values: ProfileSearchFormValues) => {
    const {profileSign} = values;
    const [nickname, codeString] = profileSign.split('#');
    onProfileEnter?.({nickname, code: +codeString});
  };

  const handleProfileSignInput = useDebouncedCallback(() => {
    handleSubmit(handleProfileEnter)();
  }, 1000);

  return (
    <View style={style}>
      <Controller
        control={control}
        name="profileSign"
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <FormField
            spellCheck={false}
            label="Partner username"
            placeholder="Partner#2342"
            onBlur={onBlur}
            isError={!!error}
            errorMessage={error?.message}
            onChangeText={profileSign => {
              onChange(profileSign);
              handleReEnter?.();
              handleProfileSignInput();
            }}
            value={value}
          />
        )}
      />
    </View>
  );
};
