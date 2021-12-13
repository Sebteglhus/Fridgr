import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';

import {
  ActivityIndicator,
  TextInput,
  Card,
  Checkbox,
  List,
  Switch
} from 'react-native-paper';


import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, addDoc, getFirestore, updateDoc, collection, getDocs, writeBatch } from "firebase/firestore"; 
import firebaseSetup from '../API/firebaseSetup';

//BRUG FOREACH PÅ ARRAY AF SELECTED OBJECTS, OG PUSH HVER OBJECT TIL DATABASE

const AddFridge = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [weight, setWeight] = useState('');
  const [user, setUser] = useState({ loggedIn: false });

  const [selectedId, setSelectedId] = useState(null);

  const [meats, setMeats] = useState([]);
  const [condiments, setCondiments] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [pasta, setPasta] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [spices, setSpices] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [itemLoad, setItemLoad] = useState([]);

  const foodControls = [
    { name: 'Spices', data: spices, setFn: setSpices },
    { name: 'Meat', data: meats, setFn: setMeats },
    { name: 'Dairy', data: dairy, setFn: setDairy },
    { name: 'Condiments', data: condiments, setFn: setCondiments },
    { name: 'Pasta', data: pasta, setFn: setPasta },
    { name: 'Vegetables', data: vegetables, setFn: setVegetables }
  ];

  const [loading, setLoading] = useState({
    Spice: true,
    Dairy: true,
    Meat: true,
    Vegetables: true,
    Condiments: true,
    Pasta: true,
  });
  const [accordionExpanded, setAccordionExpanded] = useState({
    Spice: false,
    Dairy: false,
    Meat: false,
    Vegetables: false,
    Condiments: false,
    Pasta: false,
  });
  let submittedValues = [];

  const db = getFirestore();
  useEffect(() => {
    const loadData = async (foodName, setFunction) => {
      let result = [];
      const theData = await getDocs(collection(db, 'items', 'basis', foodName));
      //console.log(`${foodName} data is ${JSON.stringify(theData)}`);
      theData.forEach((docSnap) => {
        result.push({ ...docSnap.data(), CHECKBOX_STATUS: false });
      });
      setFunction(result);
      setLoading((cur) => {
        return { ...cur, [foodName]: false };
      });
    };

    const getSuggested = async () => {
      firebaseSetup();
      console.log('Getting items');
      let result = [];

      await loadData('Spices', setSpices);
      await loadData('Meat', setMeats);
      await loadData('Dairy', setDairy);
      await loadData('Condiments', setCondiments);
      await loadData('Vegetables', setVegetables);
      await loadData('Pasta', setPasta)

      console.log('addFridge'); // checking for repeats
      setLoading(false);
    };

    getSuggested();
  }, []); // will only run this callback on the first render of this component

  const resetControls = () => {
    for (let i = 0; i < foodControls.length; i++) {
      let food = foodControls[i];
      food.setFn((cur) =>
        cur.map((d) => {
          return { ...d, CHECKBOX_STATUS: false };
        })
      );
      accordionExpanded[food.name] = false;
    }
    submittedValues = [];
  };

  const submit = async () => {
    //getting uid
    const auth = getAuth();
    const user = auth.currentUser;

    for (let i = 0; i < foodControls.length; i++) {
      let foodGroup = foodControls[i];

      for (let j = 0; j < foodGroup.data.length; j++) {
        let curr = foodGroup.data[j];
        if (curr.CHECKBOX_STATUS) {
          let item = {
            foodName: curr.name,
            foodType: foodGroup.name
          }
          await addDoc(collection(db, 'items', user.uid, foodGroup.name), item);
          submittedValues.push(foodGroup.name, curr.name);
        }
      }
    }

    alert(`submitted:\n${JSON.stringify(submittedValues)}`)
    // resetting checkbox state of all ingredient-types
    resetControls();
  };

  let drawFoodCheckboxes = (foodArray, foodName, fn) => {
    let retVal = foodArray.map((f, idx) => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginVertical: 3,
            alignItems: 'center',
          }}>
          <Switch
            value={f.CHECKBOX_STATUS}
            onValueChange={() => {
              fn((curr) => {
                let newCurr = [...curr];
                newCurr[idx].CHECKBOX_STATUS = !newCurr[idx].CHECKBOX_STATUS;

                return newCurr;
              });
            }}
          />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>{f.name}</Text>
        </View>
      );
    });

    return retVal;
  };

  let FoodCard = ({ name, data, setFn }) => {
    return (
      <List.Accordion
        title={name}
        left={(props) => <List.Icon {...props} icon="folder" />}
        expanded={accordionExpanded[name]}
        onPress={() => {
          //console.log(`accordion press ${name}`);
          setAccordionExpanded((curr) => {
            let retVal = { ...curr };
            retVal[name] = !retVal[name];
            return retVal;
          });
        }}>
        {loading[name] ? (
          <ActivityIndicator />
        ) : (
          drawFoodCheckboxes(data, name, setFn)
        )}
      </List.Accordion>
    );
  };

  return (
    <ScrollView>
      {foodControls.map((food) => (
        <FoodCard {...food} />
      ))}

      <Card style={styles.cards}>
        <Button onPress={submit} title="Submit items" color="#841584" />
      </Card>
    </ScrollView>
  );
};

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    flexDirection: 'column',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 1000,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputField: {
    borderWidth: 1,
    margin: 20,
    padding: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    textAlign: 'left',
  },
  baseText: {
    fontFamily: 'Verdana',
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default AddFridge;