import 'reflect-metadata';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {readSampleData} from './src/feat/read-health/readhealth';
import {OnboardingPage} from './src/pages/onboarding/ui';
import {NativeRouter, Route, Routes} from 'react-router-native';
import {SignInPage} from './src/pages/sign-in/ui';
import {DiProvider} from './src/providers/dependency-injection';
function App(): React.JSX.Element {
  useEffect(() => {
    readSampleData();
  }, []);

  return (
    <DiProvider>
      <NativeRouter>
        <Routes location={'/sign-in'}>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </NativeRouter>
    </DiProvider>
  );
}

export default App;
