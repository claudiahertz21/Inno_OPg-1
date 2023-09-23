import {Text, View, Button, StyleSheet } from 'react-native';
import * as React from "react";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser


//Funktionen Tattos skal vise to forskellige sider og er derfor en tab navigator
export default function Tattoos() {
    const handleLogOut = async () => {
        await signOut(auth).then(() => {
            // der logges ud
          }).catch((error) => {
            // En fejl catches
          });
    };
    //Nedenfor ses selve indholdet af siden. Med tiden er det her man skal se tatoveringer og booke tid
    return (
        <View style={styles.container}>
        <Text style={styles.header}> Se tatoveringer her</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>
    );
}

//Samme styles som resten af appen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'beige',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',},
  });