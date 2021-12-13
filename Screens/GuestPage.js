import React from 'react';
import {ScrollView, Text, Button, StyleSheet} from 'react-native';
import { Card } from 'react-native-paper';

import LoginForm from './LoginForm';
import SignUpForm from './SignUp';

const GuestPage = () => {
    return(
        <ScrollView style={styles.container}>
          <Text style={styles.paragraph}>
            Opret eller Login med din firebase Email her:
          </Text>

          <Card style={styles.card}>
            <SignUpForm />
          </Card>

          <Card style={styles.card}>
            <LoginForm />
          </Card>

        </ScrollView>
    )
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    paragraph: {
      paddingTop: 40,
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    card: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'white',
    },
  });
  
  export default GuestPage;