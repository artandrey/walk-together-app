import {View} from 'moti';
import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import AvatarPicker from '../avatar-picker/ui';
import {FormField} from '../form-field';
import {
  SaveProfileSettings as ProfileSettings,
  profileSettingsSchema,
  useProfileChange,
} from './models';
import {Button} from '../button';
import {zodResolver} from '@hookform/resolvers/zod';

export interface ProfileSettingsFormProps {
  values?: ProfileSettings;
  onProfileUpdate?: () => void;
}

export const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({
  values,
  onProfileUpdate,
}) => {
  const form = useForm<ProfileSettings>({
    resolver: zodResolver(profileSettingsSchema),
    values,
  });

  const [setProfile, isLoading] = useProfileChange();

  const handleProfileSave = async (settings: ProfileSettings) => {
    await setProfile({
      nickname: settings.profileName,
      profilePicturePath: settings.profilePicture,
    });
    onProfileUpdate?.();
  };

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
      <Button isLoading={isLoading} onPress={handleSubmit(handleProfileSave)}>
        Save profile
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
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
