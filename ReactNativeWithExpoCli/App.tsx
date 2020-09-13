import React, { Component, useState } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Image, StyleSheet, TextInput, TouchableOpacity, Text, View, AsyncStorage } from 'react-native';
// import { TextInput } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import Login from './src/components/login'
import Signup from './src/components/signup'


export default function App() {
  return (
    <Signup />
  );
};
