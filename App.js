import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import { ActivityTime } from './src/components/ActivityTime';
import { Timer } from './src/components/Timer';
import { ActivityHistory } from './src/components/ActivityHistory';

const STATUS = {
  COMPLETE: 1,
  CANCELED: 2,
};

export default function App() {
  const [activitySubject, setActivitySubject] = useState();
  const [activityHistory, setActivityHistory] = useState([]);
  const addActivityHistorySubjectWithState = (subject, status) => {
    setActivityHistory([...activityHistory, { subject, status }]);
  };
  console.log(activityHistory);

  const onClear = () => {
    setActivityHistory([]);
  };

  const saveActivityHistory = async () => {
    try {
      await AsyncStorage.setItem(
        'activityHistory',
        JSON.stringify(activityHistory)
      )
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveActivityHistory();
  }, [activityHistory]);

  const loadActivityHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('activityHistory');
      if (history && JSON.parse(history).length) {
        setActivityHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadActivityHistory();
  }, []);

  return (
    <View style={styles.container}>
    <Text>
      {activitySubject ? (
        <Timer
          activitySubject={activitySubject}
          onTimerEnd={() => {
            addActivityHistorySubjectWithState(
              activitySubject,
              STATUS.COMPLETE
            );
            setActivitySubject(null);
          }}
          clearSubject={() => {
            addActivityHistorySubjectWithState(
              activitySubject,
              STATUS.CANCELED
            );
            setActivitySubject(null);
          }}
        />
      ) : (
        <>
          
            <ActivityTime addSubject={setActivitySubject} />
            <ActivityHistory
              activityHistory={activityHistory}
              onClear={onClear}
            />
         
        </>
      )}
      </Text >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#686de0',
    paddingLeft: 5,
    paddingTop: 25,
  },
});
