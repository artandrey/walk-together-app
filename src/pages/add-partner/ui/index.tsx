import React, {FC} from 'react';
import {WithGradientBackground} from '../../../feat/gradient-background';
import {Container} from '../../../feat/container';
import {HeadingText} from '../../../feat/heading-text';
import {ScrollView, StyleSheet} from 'react-native';
import {PartnerManagementWidget} from '../../../widgets/partner-management';
import LandscapeView from './landscape-view';
import {Button} from '../../../feat/button';
import {useNavigate} from 'react-router-native';

export interface AddPartnerPageProps {
  isOnboarding?: boolean;
}

export const AddPartnerPage: FC<AddPartnerPageProps> = ({isOnboarding}) => {
  const navigate = useNavigate();

  return (
    <WithGradientBackground>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Container>
          <HeadingText>Add a walking partner</HeadingText>
          <LandscapeView style={styles.landscapeIcon} />
          <PartnerManagementWidget />
          {isOnboarding ? (
            <Button
              variant="ghost"
              style={styles.exitButton}
              onPress={() => navigate('/home')}>
              Skip
            </Button>
          ) : (
            <Button
              variant="ghost"
              style={styles.exitButton}
              onPress={() => navigate(-1)}>
              Cancel
            </Button>
          )}
        </Container>
      </ScrollView>
    </WithGradientBackground>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  landscapeIcon: {
    marginTop: 20,
  },
  exitButton: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
});
