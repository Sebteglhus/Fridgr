import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { getAuth, signOut } from "firebase/auth";

//profile view
const ProfileScreen = () => {
    const auth = getAuth();
    const handleLogOut = async () => {
        await signOut(auth).then(() => {
            console.log("Sign out done")
        }).catch((error) => {
            console.log("error occured");
        })
    };
    if (!getAuth().currentUser.email) {
        return <View><Text>Not found</Text></View>;
    }
    return (
        <View style={styles.container} >
            <Text>Current user: {getAuth().currentUser.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>
    );

}
//styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    baseText: {
        fontFamily: "Verdana"
      },
});

export default ProfileScreen