import 'reflect-metadata';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {readSampleData} from './src/feat/read-health/readhealth';
import {NativeRouter} from 'react-router-native';
import {DiProvider} from './src/providers/dependency-injection';
import {ReactQueryProvider} from './src/providers/react-query-provider';
import {AuthProvider} from './src/feat/auth';
import {Router} from './src/routing';
function App(): React.JSX.Element {
  useEffect(() => {
    readSampleData();
  }, []);

  return (
    <DiProvider>
      <AuthProvider>
        <ReactQueryProvider>
          <NativeRouter>
            <Router />
          </NativeRouter>
        </ReactQueryProvider>
      </AuthProvider>
    </DiProvider>
  );
}

export default App;
