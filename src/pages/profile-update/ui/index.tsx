import React from 'react';
import {WithGradientBackground} from '../../../feat/gradient-background';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Container} from '../../../feat/container';
import {HeadingText} from '../../../feat/heading-text';
import {ProfileSettingsForm} from '../../../feat/profile-settings/ui';
import {Button} from '../../../feat/button';
import {useNavigate} from 'react-router-native';

export const UpdateProfilePage = () => {
  const navigate = useNavigate();
  return (
    <WithGradientBackground>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Container style={styles.container}>
          <HeadingText>Profile update</HeadingText>
          <ProfileSettingsForm />
          <Button
            onPress={() => navigate(-1)}
            style={styles.cancelButton}
            variant="ghost">
            Cancel
          </Button>
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
  cancelButton: {
    marginTop: 15,
    alignSelf: 'stretch',
  },
});
