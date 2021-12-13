//general imports
import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//firebase imports
import { getAuth } from "firebase/auth";
import firebaseSetup from './API/firebaseSetup'

//component imports
import GuestPage from './Screens/GuestPage'
import AddFridge from './Screens/AddFridge';
import FridgeScreen from './Screens/FridgeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import Tabs from './Navigation/tabs';


export default function App() {
  //user const defined
  const [user, setUser] = useState({ loggedIn: false });

  firebaseSetup();
  //logged in?
  function onAuthStateChange(callback) {
    return getAuth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });}

    useEffect(() => {
      const unsubscribe = onAuthStateChange(setUser);
      return () => {
        unsubscribe();
      };
    }, []);
    if (user.loggedIn == true) {
      
      return (
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>

      )
    } else {
      return(
        <GuestPage />
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: "Verdana"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
