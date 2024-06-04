import React, {FC} from 'react';
import GoogleIcon from './google-icon';
import {Button, ButtonProps} from '../../button';
import {useInjection} from 'inversify-react';
import {AuthService} from '../../../api/auth/auth-service';
import {googleButtonPalette} from '../models';

export interface SignInWithGoogleButtonProps extends ButtonProps {
  onSignIn?: () => void;
}

export const SignInWithGoogleButton: FC<SignInWithGoogleButtonProps> = ({
  onSignIn,
  onPress,
  ...rest
}) => {
  const authService = useInjection(AuthService);

  const handlePress = async () => {
    await authService.signInWithGoogle();
    onSignIn?.();
    onPress?.();
  };

  return (
    <Button
      onPress={handlePress}
      leftIcon={<GoogleIcon width={44} height={44} />}
      {...googleButtonPalette}
      {...rest}>
      Google
    </Button>
  );
};
