import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import {RoundedButton} from './RoundedButton';

const HistoryItem = ({ item }) => {
  return <Text style={styles.historyItem(item.status)}> {item.subject} </Text>;
};


export const ActivityHistory = ({ activityHistory, onClear }) => {
  return (
    <>
    <SafeAreaView style={{flex:1}}>
      <Text style={styles.title}> Activity History </Text>
      {!!activityHistory.length && (
        <FlatList data={activityHistory} renderItem={HistoryItem} 
        contentContainerStyle= {{flex:1, alignItems: 'center'}}/>
      )}
    </SafeAreaView>
    <View style={styles.clearContainer}> 
        <RoundedButton size={70} title='Clear' onPress={()=> onClear()} />
    </View>
    </>
  );
};


const styles = StyleSheet.create({
  historyItem:(status)=>({
    fontSize: 16,
    color:status > 1 ? 'red' : 'green'
  }),
  title:{
    color:'white',

  },
  clearContainer:{
    alignItems:'center',
    
  }
})
