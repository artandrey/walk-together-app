import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FormField} from '../../feat/form-field';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Credentials, credentialsValidationSchema} from './models';
import {Button} from '../../feat/button';

interface CredentialsFormProps {
  onSubmit: (credentials: Credentials) => Promise<void>;
}

export const CredentialsForm: FC<CredentialsFormProps> = ({onSubmit}) => {
  const form = useForm<Credentials>({
    resolver: zodResolver(credentialsValidationSchema),
  });
  const {
    formState: {disabled},
    handleSubmit,
  } = form;

  return (
    <View>
      <View style={styles.fieldsWrapper}>
        <Controller
          name="email"
          control={form.control}
          render={({field: {onChange, onBlur, value}, formState: {errors}}) => (
            <FormField
              label="Email"
              value={value}
              isError={!!errors['email']}
              errorMessage={errors['email']?.message?.toString()}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your email"
              textContentType="emailAddress"
            />
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({field: {onBlur, onChange, value}, formState: {errors}}) => (
            <FormField
              label="Password"
              placeholder="Enter your password"
              textContentType="password"
              secureTextEntry
              isError={!!errors['password']}
              errorMessage={errors['password']?.message?.toString()}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={disabled}
        style={styles.submitButtonStyles}>
        Sign in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldsWrapper: {
    gap: 26,
  },
  submitButtonStyles: {
    marginTop: 38,
  },
});
