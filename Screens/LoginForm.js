import React, {useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {Button, Text, View, TextInput, ActivityIndicator, StyleSheet, Pressable, KeyboardAvoidingView } from 'react-native';



const LoginForm = () => {
    const auth = getAuth();
    //state variable
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const renderButton = () => {
        return <Button title="Login" onPress={() => handleSubmit()}/>;
    };
    const handleSubmit = async() => {
        console.log(email, password);
        try {
           await signInWithEmailAndPassword(auth, email, password).then((data)=>{
               console.log(data)
               const user = userCredential.user
           });
        } catch (error){
           setErrorMessage(error.message)
        }

    }
    return (
        <View>
            {/*overskrift*/}
            <Text style={styles.header}>Log in</Text>
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
    baseText: {
        fontFamily: "Verdana"
      },
    header: {
        fontSize: 40,
        textAlign: 'center'
    },
});
export default LoginForm