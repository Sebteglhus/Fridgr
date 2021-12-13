import React from 'react';
import { useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import { Card, List } from 'react-native-paper';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, collection, getDocs } from "firebase/firestore"; 
import firebaseSetup from '../API/firebaseSetup';


//profile view
const recipeScreen = () => {
    // db setup
    const [recipeData, setRecipeData] = useState([]);
    const [fridgeData, setFridgeData] = useState([]);
    const [foods, setFoods] = useState([]);
    firebaseSetup();
    const db = getFirestore();

    //get recipes from db
    useEffect(() => {
        const getRecipes = async () => {
          const recipes = [];
          const recipeItems = await getDocs(collection(db, "recipe"));
          recipeItems.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            recipes.push(doc.data());
          });
          setRecipeData(recipes);
        }

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
            setFoods(result)
        }
        const getFridge = async () => {
            firebaseSetup();
            console.log('Getting items');
            await loadData('Spices', setFoods);
            await loadData('Meat', setFoods);
            await loadData('Dairy', setFoods);
            await loadData('Condiments', setFoods);
            await loadData('Vegetables', setFoods);
            await loadData('Pasta', setFoods)
      
            //setLoading(false);
      
          };
        getFridge();
        getRecipes();
      }, []);  // will only run this callback on the first render of this component
    //forEach til at lave objekter fra db array?

    //set function for rendering with .map

    //filter array based on user ingredients
    console.log("this is foods in recipes", foods)
    const recipes = recipeData;
    const ingredients = foods;
    const matchRecipesFromIngredients = (recipes, ingredients, threshold = .5) => {

        // make array of only the ingredient names
        const ingredientNames = ingredients.map(i => i.foodName);

        return recipes.filter(recipe => {
           
          // determine the total amount of ingredients
           const total = recipe.Ingredients.length;
          
          // make an array of only the recipe's ingredient names
           const recipeIngNames = recipe.Ingredients.map(i => i.name);
           
          // find the matches between the ingredients
           const matchLength = ingredientNames
               // and the ingredient names, and get the amount
               .filter(ingred => recipeIngNames.includes(ingred)).length;
               
           // determine if the amount meets the threshold
           // true means the recipe will be included, false will not
           return matchLength >= (total * threshold) ? true : false;
        });
    };
    //define array of filtered recipes
    let filteredRecipes = matchRecipesFromIngredients(recipes, ingredients);
    console.log("available recipes:", filteredRecipes);
    let recipeView = filteredRecipes.map(f => (
        <View style={styles.container} >
        <Card style={styles.cards}>
            <Card.Content>
            <Text style={styles.baseText}>Ingredients:</Text>
            {f.Ingredients.map(a => (
                <Text style={styles.baseText}>
                    {a.name}
                </Text>
                
            ))}
            <View style={styles.container} >
        <Text style={styles.baseText}>
            Steps:
        </Text>
        <Text style={styles.baseText}>
            { f.howTo }
        </Text>
        <Text style={styles.baseText}>
            This recipe will take:
            { f.timeMinutes }   
            minutes
        </Text>
        </View>
            </Card.Content>
        </Card>
        </View>
    ))
    return (
        <ScrollView>
            <Text style={styles.titleText}>
                Matching Recipes
            </Text>
            { recipeView }
        </ScrollView>
    );

}
//styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
    },
    baseText: {
        fontFamily: "Verdana",
        textAlign: 'center'
      },
      titleText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        paddingBottom: 0,
      },
      cards: {
          display: "flex",
          flexDirection: "column"
      }
});

export default recipeScreen