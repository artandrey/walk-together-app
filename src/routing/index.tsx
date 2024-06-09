import React from 'react';
import {Routes, Route, Navigate} from 'react-router-native';
import {AddPartnerPage} from '../pages/add-partner';
import {OnboardingPage} from '../pages/onboarding/ui';
import {SetupProfilePage} from '../pages/profile-setup';
import {UpdateProfilePage} from '../pages/profile-update';
import {SignInPage} from '../pages/sign-in';
import {SignUpPage} from '../pages/sign-up';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<OnboardingPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/profile-setup" element={<SetupProfilePage />} />
      <Route path="/profile-update" element={<UpdateProfilePage />} />
      <Route
        path="/add-partner-onboarding"
        element={<AddPartnerPage isOnboarding />}
      />
      <Route path="/add-partner" element={<AddPartnerPage />} />
    </Routes>
  );
};
