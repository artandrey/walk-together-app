import React from 'react';
import {WithGradientBackground} from '../../../feat/gradient-background';
import {ScrollView, StyleSheet} from 'react-native';
import {Container} from '../../../feat/container';
import {HeadingText} from '../../../feat/heading-text';
import {ProfileSettingsForm} from '../../../feat/profile-settings/ui';
import {Button} from '../../../feat/button';
import {useNavigate} from 'react-router-native';
import {useProfile} from '../../../feat/profile-settings';

export const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const {data: profile} = useProfile();

  return (
    <WithGradientBackground>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Container style={styles.container}>
          <HeadingText>Profile update</HeadingText>
          <ProfileSettingsForm
            values={{
              profileName: profile?.nickname ?? '',
              profilePicture: profile?.profilePicturePath,
            }}
          />
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
