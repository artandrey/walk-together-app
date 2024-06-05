import 'reflect-metadata';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {readSampleData} from './src/feat/read-health/readhealth';
import {OnboardingPage} from './src/pages/onboarding/ui';
import {NativeRouter, Route, Routes} from 'react-router-native';
import {DiProvider} from './src/providers/dependency-injection';
import {SignUpPage} from './src/pages/sign-up';
import {SignInPage} from './src/pages/sign-in';
import {SetupProfilePage} from './src/pages/profile-setup';
import {UpdateProfilePage} from './src/pages/profile-update';
function App(): React.JSX.Element {
  useEffect(() => {
    readSampleData();
  }, []);

  return (
    <DiProvider>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile-setup" element={<SetupProfilePage />} />
          <Route path="/profile-update" element={<UpdateProfilePage />} />
        </Routes>
      </NativeRouter>
    </DiProvider>
  );
}

export default App;
