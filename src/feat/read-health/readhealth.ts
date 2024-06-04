import {initialize, readRecords} from 'react-native-health-connect';

export const readSampleData = async () => {
  // initialize the client
  const isInitialized = await initialize();
  console.log(isInitialized);

  // request permissions

  const result = await readRecords('Steps', {
    timeRangeFilter: {
      operator: 'between',
      startTime: '2024-04-21T16:47:56.231Z',
      endTime: '2024-05-21T16:47:56.231Z',
    },
  });

  console.log(result);
};
