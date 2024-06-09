import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';
import {
  AnimatePresence,
  MotiImage,
  MotiView,
  motify,
  useAnimationState,
} from 'moti';
import {IRetrieveUserProfile} from '../../../api/profile/models';
import {palette} from '../../../styles/theme';
import {EmptyProfilePicture} from './empty-profile-picture';

export interface PartnerCardProps {
  profile: IRetrieveUserProfile | null;
  style?: ViewStyle;
}

const formatCode = (code: number) => code.toString().padStart(4, '0');

const AnimatedEmptyProfilePicture = motify(EmptyProfilePicture)();

export const PartnerCard: FC<PartnerCardProps> = ({profile, style}) => {
  const wrapperAnimationState = useAnimationState({
    from: {
      width: 0,
    },
    with: {
      width: '100%',
    },
  });

  const imageWrapperAnimationState = useAnimationState({
    open: {
      rotate: '0deg',
    },
    close: {
      rotate: '360deg',
    },
  });

  useEffect(() => {
    if (profile) {
      wrapperAnimationState.transitionTo('with');
      imageWrapperAnimationState.transitionTo('open');
    } else {
      wrapperAnimationState.transitionTo('from');
      imageWrapperAnimationState.transitionTo('close');
    }
  }, [profile, wrapperAnimationState, imageWrapperAnimationState]);

  return (
    <MotiView
      transition={{duration: 1000, type: 'timing'}}
      state={wrapperAnimationState}
      style={[styles.wrapper, style]}>
      <MotiView
        transition={{type: 'timing', duration: 900, delay: 100}}
        state={imageWrapperAnimationState}
        style={styles.imageWrapper}>
        <AnimatePresence>
          {profile && (
            <MotiImage
              key="image"
              from={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 1000, type: 'timing', delay: 1000}}
              exitTransition={{delay: 1000}}
              style={styles.image}
              src={profile.profilePicturePath}
            />
          )}
          {!profile && (
            <AnimatedEmptyProfilePicture
              key="empty"
              from={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 1000, type: 'timing'}}
              exitTransition={{delay: 1000}}
              style={styles.image}
            />
          )}
        </AnimatePresence>
      </MotiView>
      <AnimatePresence>
        {profile && (
          <MotiView
            from={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{delay: 1000}}
            exitTransition={{delay: 0, duration: 400}}
            style={styles.profileNameWrapper}>
            <Text style={styles.profileNameText} numberOfLines={1}>
              {profile.nickname}
            </Text>
            <Text numberOfLines={1} style={styles.profileTagText}>
              #{formatCode(profile.code)}
            </Text>
          </MotiView>
        )}
      </AnimatePresence>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 0,
    minWidth: 77 + 15 * 2,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: palette.foreground,
    borderRadius: 9999,
  },
  image: {
    width: 77,
    height: 77,
    borderRadius: 9999,
    overflow: 'hidden',
    position: 'absolute',
  },
  imageWrapper: {
    width: 77,
    height: 77,
  },
  profileNameWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 6,
  },
  profileNameText: {
    textAlign: 'center',
    fontSize: 24,
    color: palette.textMain,
  },
  profileTagText: {
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    fontSize: 16,
    backgroundColor: palette.accent,
    borderRadius: 9999,
    color: palette.foreground,
  },
});
