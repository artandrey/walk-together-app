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

export const SignInPage = () => {
  const navigate = useNavigate();
  const authService = useInjection(AuthService);

  const handleCredentialsSignIn = async (credentials: Credentials) => {
    await withDelay(authService.signInWithCredentials(credentials));
  };

  return (
    <WithGradientBackground>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Container style={styles.container}>
          <AnimationHeadingText
            from={{opacity: 0, translateY: 5}}
            animate={{opacity: 1, translateY: 0}}
            style={styles.headingText}>
            Please, sign in to your account
          </AnimationHeadingText>
          <View style={styles.wrapper}>
            <CredentialsForm
              buttonText="Sign in"
              onSubmit={handleCredentialsSignIn}
            />
            <DashSeparatedText style={styles.separatingText}>
              or login with
            </DashSeparatedText>
            <SignInWithGoogleButton style={styles.googleButton} />
            <Text style={styles.alternativeActionText}>
              <Text>Don’t have an account? </Text>
              <Text
                onPress={() => navigate('/sign-up')}
                style={styles.alternativeActionTextLink}>
                Sign up
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
