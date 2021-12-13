import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Image } from 'react-native';
import AddFridge from '../Screens/AddFridge';
import FridgeScreen from '../Screens/FridgeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import recipeScreen from '../Screens/recipeScreen';
import shoppingList from '../Screens/shoppingList';

const Tab = createBottomTabNavigator();

function CameraButton() {
    return (
      <Image
        style={{ width: 50, height: 50, alignItems: "left" }}
        source={{uri : "https://i.pinimg.com/474x/df/d3/12/dfd3125a812cef1de680e467fe33cfa3.jpg"}}
      />
      
    );
  }

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="My Fridge" component= {FridgeScreen} />
            <Tab.Screen name="+" options={{ headerTitle: (props) => <CameraButton {...props} /> }} component= {AddFridge} />
            <Tab.Screen name="Recipes" component= {recipeScreen} />
            <Tab.Screen name="Shopping List" component= {shoppingList} />
            <Tab.Screen name="Profile" component= {ProfileScreen} />
        </Tab.Navigator>
    );
}

export default Tabs;