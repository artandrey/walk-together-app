import {useInjection} from 'inversify-react';
import {View} from 'moti';
import React from 'react';
import {ScrollView} from 'react-native';
import {AuthService} from '../../../api/auth/auth-service';
import {CredentialsForm} from '../../../widgets/credentials-form';
import {Credentials} from '../../../widgets/credentials-form/models';
import {SignInWithGoogleButton} from '../../../feat/login-with-google';

export const SignInPage = () => {
  const authService = useInjection(AuthService);

  const handleCredentialsSignIn = async (credentials: Credentials) => {
    await authService.signInWithCredentials(credentials);
  };

  return (
    <ScrollView>
      <View>
        <CredentialsForm onSubmit={handleCredentialsSignIn} />
        <SignInWithGoogleButton />
      </View>
    </ScrollView>
  );
};
