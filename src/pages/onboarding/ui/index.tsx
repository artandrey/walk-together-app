import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CircularProgressButton} from '../../../feat/circular-progress-button';
import {Text as MotiText, View} from 'moti';
import {palette} from '../../../styles/theme';
import {Carousel} from './carousel';
import {onboardingSlides} from '../onboarding-steps';
import {useCarouselState} from '../models/carousel';
import {useNavigate} from 'react-router-native';

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
    <LinearGradient
      style={styles.wrapper}
      colors={['#FFFFFF', '#FAF4FF', '#FCFAE9']}>
      <ScrollView>
        <View style={styles.container}>
          <MotiText style={styles.headerText}>
            Welcome to Walk Together -
          </MotiText>
          <Carousel currentIndex={currentIndex} steps={onboardingSlides} />
        </View>
      </ScrollView>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    width: 300,
    marginTop: 90,
    textAlign: 'center',
    fontSize: 36,
    letterSpacing: 1.1,
    fontWeight: 'bold',
    color: palette.textMain,
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
});
