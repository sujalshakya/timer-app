import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration , Platform } from 'react-native';
import { CountDown } from '../components/CountDown';
import { RoundedButton } from '../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';

import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../utils/color';
import { fontSize, spacing } from '../utils/sizes';

const DEFAULT_TIME = 0.1;

export const Timer = ({ activitySubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const interval = React.useRef(null);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    console.log(min);
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false)
    onTimerEnd();
  };

  const vibrate = ()=> {
    if (Platform.OS === 'ios'){
      const interval = setInterval(()=> Vibration.vibrate(), 1000)
      setTimeout(()=> clearInterval(interval), 1000)
    } else {
      Vibration.vibrate(10000)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Current Activity: </Text>
        <Text style={styles.task}>{activitySubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#CC8F0C"
          style={{ height: 20 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}  
        
      </View>
        <View style={styles.clearSubject}>
        <RoundedButton title="-" size={60} onPress={()=> clearSubject()} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize.xl,
  },
  clearSubject:{
    paddingBottom: 25,
    paddingLeft:25,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
