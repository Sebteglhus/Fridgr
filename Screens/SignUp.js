import React, {useState} from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {Button, Text, View, TextInput, ActivityIndicator, StyleSheet, Pressable} from 'react-native';

const SignUpForm = () => {
    //state variable
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    //unused button setup; to be removed
    const renderButton = () => {
        return <Button title="Create User" onPress={() => handleSubmit()}/>;
    };

    const auth = getAuth();
    //handling the signup request
    const handleSubmit = async() => {
        console.log(email, password);
        try {
           await createUserWithEmailAndPassword(auth, email, password).then((data)=>{
               console.log(data)
               const user = userCredential.user
           });
        } catch (error){
           setErrorMessage(error.message)
        }

    }
    //the actual page
    return (
        <View>
            {/*overskrift*/}
            <Text style={styles.header}>Sign up</Text>
            {/*input 1*/}
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            {/*input 2*/}
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {renderButton()}

        </View>
    );
}
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
        textAlign: 'center'
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
      },
      baseText: {
        fontFamily: "Verdana"
      },
});
export default SignUpForm