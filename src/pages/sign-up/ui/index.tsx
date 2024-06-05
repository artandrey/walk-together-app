import {useInjection} from 'inversify-react';
import {View, motify} from 'moti';
import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {AuthService} from '../../../api/auth/auth-service';
import {CredentialsForm} from '../../../widgets/credentials-form';
import {Credentials} from '../../../widgets/credentials-form/models';
import {SignInWithGoogleButton} from '../../../feat/login-with-google';
import {DashSeparatedText} from '../../../feat/dash-separated-text/ui';
import {HeadingText} from '../../../feat/heading-text';
import {Container} from '../../../feat/container';
import {palette} from '../../../styles/theme';
import {useNavigate} from 'react-router-native';
import {WithGradientBackground} from '../../../feat/gradient-background';
import {withDelay} from '../../../feat/loading-with-delay';

const AnimationHeadingText = motify(HeadingText)();

export const SignUpPage = () => {
  const authService = useInjection(AuthService);

  const navigate = useNavigate();

  const handleCredentialsSignIn = async (credentials: Credentials) => {
    console.log(credentials);

    await withDelay(authService.signUpWithCredentials(credentials));
    navigate('/profile-setup');
  };

  return (
    <WithGradientBackground>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Container style={styles.container}>
          <AnimationHeadingText
            from={{opacity: 0, translateY: 5}}
            animate={{opacity: 1, translateY: 0}}
            style={styles.headingText}>
            Please, create an account
          </AnimationHeadingText>
          <View style={styles.wrapper}>
            <CredentialsForm
              buttonText="Sign up"
              onSubmit={handleCredentialsSignIn}
            />
            <DashSeparatedText style={styles.separatingText}>
              or continue with
            </DashSeparatedText>
            <SignInWithGoogleButton style={styles.googleButton} />
            <Text style={styles.alternativeActionText}>
              <Text>Already have an account? </Text>
              <Text
                onPress={() => navigate('/sign-in')}
                style={styles.alternativeActionTextLink}>
                Sign in
              </Text>
            </Text>
          </View>
        </Container>
      </ScrollView>
    </WithGradientBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    paddingBottom: 28,
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapper: {
    alignSelf: 'stretch',
  },
  headingText: {
    marginTop: 90,
  },
  separatingText: {
    marginTop: 38,
  },
  googleButton: {
    marginTop: 26,
  },
  alternativeActionText: {
    marginTop: 36,
    textAlign: 'center',
    fontSize: 16,
    color: palette.textSecondary,
  },
  alternativeActionTextLink: {
    color: palette.accent,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: palette.accent,
  },
});
