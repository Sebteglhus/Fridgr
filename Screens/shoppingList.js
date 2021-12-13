import React from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';



const shoppingList = () => {
    return (
        <SafeAreaView>
            <Text>
                This is your Shopping list! This feature will be added in the future.
            </Text>
        </SafeAreaView>
    )
}

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

export default shoppingList