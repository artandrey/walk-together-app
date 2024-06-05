import {View} from 'moti';
import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text} from 'react-native';
import AvatarPicker from '../avatar-picker/ui';
import {FormField} from '../form-field';
import {
  SaveProfileSettings as ProfileSettings,
  profileSettingsSchema,
} from './models';
import {Button} from '../button';
import {zodResolver} from '@hookform/resolvers/zod';

export interface ProfileSettingsFormProps {
  defaultValues?: ProfileSettings;
}

export const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({
  defaultValues,
}) => {
  const form = useForm<ProfileSettings>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues,
  });

  const handleProfileSave = (settings: ProfileSettings) => {};

  const {handleSubmit, control} = form;
  return (
    <View style={styles.formWrapper}>
      <View>
        <Controller
          name="profilePicture"
          control={control}
          render={({field: {onChange, value}}) => (
            <AvatarPicker
              imageUrl={value}
              size={140}
              style={styles.avatarPicker}
              onSelect={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="profileName"
          render={({field: {onBlur, onChange, value}, formState: {errors}}) => (
            <>
              <FormField
                placeholder="Enter your profile name"
                style={styles.usernameField}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                isError={!!errors.profileName}
                errorMessage={errors.profileName?.message?.toString()}
              />
            </>
          )}
        />
      </View>
      <Button onPress={handleSubmit(handleProfileSave)}>Save profile</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    gap: 60,
    flex: 1,
  },
  avatarPicker: {
    marginTop: 60,
    alignSelf: 'center',
  },
  usernameField: {
    marginTop: 58,
    textAlign: 'center',
  },
});
