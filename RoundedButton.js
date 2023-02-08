import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 115,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]} onPress={props.onPress}>
        {' '}
        {props.title}{' '}
      </Text>
    </TouchableOpacity>
  );
};
const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      borderColor: '#fff',
      borderWidth: 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#fff',
      fontSize: size / 3,
    },
  });
