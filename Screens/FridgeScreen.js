import React from 'react';
import { useEffect, useState} from 'react';
import {RefreshControl, View, Text, Button, StyleSheet, FlatList, SectionList, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { Card } from 'react-native-paper';


import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, addDoc, getFirestore, updateDoc, collection, getDocs } from "firebase/firestore"; 
import firebaseSetup from '../API/firebaseSetup';




/*const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.foodName}</Text>
  </TouchableOpacity>
);*/

const FridgeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [fridgeData, setFridgeData] = useState([]);
  const [loading, setLoading] = useState({
    Spice: true,
    Dairy: true,
    Meat: true,
    Vegetables: true,
    Condiments: true,
    Pasta: true,
  })
  const [meats, setMeats] = useState([]);
  const [condiments, setCondiments] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [pasta, setPasta] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [spices, setSpices] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    firebaseSetup();
    const db = getFirestore();

    const loadData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      let result = [];
      let foodName = ['Spices', 'Meat', 'Dairy', 'Condiments', 'Vegetables', 'Pasta'];
      
      for (const name of foodName) {
        const theData = await getDocs(collection(db, 'items', user.uid, name));
        theData.forEach((docSnap) => {
          result.push({...docSnap.data()});
        })
      }
      setFoods(result);
      /*setLoading((cur) => {
        return { ...cur, [foodName]: false };
      });*/
    }
    const getFridge = async () => {
      firebaseSetup();
      console.log('Getting items');
      //let result = [];

      await loadData('Spices', setFoods);
      await loadData('Meat', setFoods);
      await loadData('Dairy', setFoods);
      await loadData('Condiments', setFoods);
      await loadData('Vegetables', setFoods);
      await loadData('Pasta', setFoods);

      //setLoading(false);

    };

    getFridge();
  }, []);  // will only run this callback on the first render of this component

    
  let entireFridge = [];

  console.log("this is foods", foods);
  let fridgeView = foods.map(f => (
    <Text> { f.foodName }</Text>
  ))
//console.log(fridgeData)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      { fridgeView }
      </ScrollView>
  </SafeAreaView>
  )
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
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    baseText: {
      fontFamily: "Verdana"
    },
    title: {
      textAlign: "center"
    }
  });
  
export default FridgeScreen