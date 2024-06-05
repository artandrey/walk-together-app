import React from 'react';
import {WithGradientBackground} from '../../../feat/gradient-background';
import {ScrollView, StyleSheet} from 'react-native';
import {Container} from '../../../feat/container';
import {HeadingText} from '../../../feat/heading-text';
import {ProfileSettingsForm} from '../../../feat/profile-settings/ui';

export const SetupProfilePage = () => {
  return (
    <WithGradientBackground>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Container style={styles.container}>
          <HeadingText>Let’s setup your profile</HeadingText>
          <ProfileSettingsForm />
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
