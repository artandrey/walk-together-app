import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ProfileSearchForm, ProfileSign} from '../../feat/profile-search';
import {PartnerCard} from '../../feat/partner-card/ui';
import {useProfileSearch} from '../../feat/profile-search/models';
import {Button} from '../../feat/button';

export const PartnerManagementWidget = () => {
  const [profileSign, setProfileSign] = useState<ProfileSign | null>(null);

  const {
    data: profile = null,
    isLoading,
    error,
  } = useProfileSearch(profileSign?.nickname, profileSign?.code);

  const handleProfileEnter = (submittedProfileSign: ProfileSign) => {
    setProfileSign(submittedProfileSign);
  };

  const handleProfileReEnter = () => {
    setProfileSign(null);
  };

  return (
    <View style={styles.wrapper}>
      <ProfileSearchForm
        handleReEnter={handleProfileReEnter}
        onProfileSignEnter={handleProfileEnter}
        errorMessage={error?.message}
      />
      <PartnerCard style={styles.searchResult} profile={profile} />
      <Button
        disabled={!profile}
        isLoading={isLoading}
        style={styles.addButton}>
        Add
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
  },

  searchResult: {
    marginTop: 20,
  },
  addButton: {
    marginTop: 'auto',
  },
});
