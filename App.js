import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';

import SignUpForm from './Screens/SignUp';
import LoginForm from './Screens/LoginForm';
import ProfileScreen from './Screens/ProfileScreen'

const firebaseConfig = {
  apiKey: "AIzaSyCUVlvZvWfyWC4OqkfmQxSKFgCvdlOpGd4",
  authDomain: "supreme-carnival.firebaseapp.com",
  projectId: "supreme-carnival",
  storageBucket: "supreme-carnival.appspot.com",
  messagingSenderId: "889213915209",
  appId: "1:889213915209:web:eb4f65b2ca747d8b8b2f98"
};


export default function App() {
  //user const sættes
  const [user, setUser] = useState({ loggedIn: false });

  //firebase intialization
  if (!firebase.apps.length) {
    initializeApp(firebaseConfig);
    console.log("firebase initiated");
  }

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

    //Guestpage
    const GuestPage = () => {
      return(
          <View style={styles.container}>
            <Text style={styles.paragraph}>
              Opret eller Login med din firebase Email
            </Text>
  
            <Card style={{padding:20}}>
              <SignUpForm />
            </Card>
  
            <Card style={{padding:20}}>
              <LoginForm />
            </Card>
  
          </View>
      )
    }
    if (user.loggedIn == true) {
      return (
        < ProfileScreen />
      )
    } else {
      return(
        < GuestPage />
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
