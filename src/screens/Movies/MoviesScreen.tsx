import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from './styles';



const MoviesScreen: React.FC = () => {
  //State & Data


  console.log("WE ARE IN THE MOVIES SCREEN")

  //Hooks


  //Effects

  //functions

  //rendering
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text>Movies Screen</Text>

      </ScrollView >

    </View >
  );
};

export default MoviesScreen;
