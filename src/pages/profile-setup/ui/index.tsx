import React from 'react';
import {WithGradientBackground} from '../../../feat/gradient-background';
import {ScrollView, StyleSheet} from 'react-native';
import {Container} from '../../../feat/container';
import {HeadingText} from '../../../feat/heading-text';
import {ProfileSettingsForm} from '../../../feat/profile-settings/ui';
import {useNavigate} from 'react-router-native';

export const SetupProfilePage = () => {
  const navigate = useNavigate();

  return (
    <WithGradientBackground>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Container style={styles.container}>
          <HeadingText>Let’s setup your profile</HeadingText>
          <ProfileSettingsForm
            onProfileUpdate={() => navigate('/add-partner-onboarding')}
          />
        </Container>
      </ScrollView>
    </WithGradientBackground>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingBottom: 82,
  },
});
