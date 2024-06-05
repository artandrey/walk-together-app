import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {CircularProgressButton} from '../../../feat/circular-progress-button';
import {View} from 'moti';
import {palette} from '../../../styles/theme';
import {Carousel} from './carousel';
import {onboardingSlides} from '../onboarding-steps';
import {useCarouselState} from '../models/carousel';
import {useNavigate} from 'react-router-native';
import {HeadingText} from '../../../feat/heading-text';
import {Container} from '../../../feat/container';
import {WithGradientBackground} from '../../../feat/gradient-background';

export const OnboardingPage = () => {
  const {currentIndex, next, canGoNext} = useCarouselState({
    itemsCount: onboardingSlides.length,
  });
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (canGoNext) {
      next();
    } else {
      navigate('/sign-in', {replace: true});
    }
  };

  const onboardingProgressPercent = Math.min(
    ((currentIndex + 1) / onboardingSlides.length) * 100 + 1,
    100,
  );

  return (
    <WithGradientBackground>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Container>
          <HeadingText style={styles.headingText}>
            Welcome to Walk Together -
          </HeadingText>
          <Carousel currentIndex={currentIndex} steps={onboardingSlides} />
          <View style={styles.nextButtonContainer}>
            <CircularProgressButton
              padding={20}
              color={palette.accent}
              progressBar={{
                borderWidth: 3,
                color: palette.accent,
                radius: 50,
                percentage: onboardingProgressPercent,
                duration: 1000,
              }}
              onPress={handleNextClick}>
              <Text>123</Text>
            </CircularProgressButton>
          </View>
        </Container>
      </ScrollView>
    </WithGradientBackground>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  headingText: {
    marginTop: 90,
  },
  nextButtonContainer: {
    marginTop: 'auto',
    alignSelf: 'center',
  },
});
