import {Text, View, Button, StyleSheet } from 'react-native';
import * as React from "react";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser


//Følgende funktion er for profilsiden. Her kommer man til at kunne ændre Profil og præferencer
//Og så kan man logge ud
export default function Profile() {
    const handleLogOut = async () => {
        await signOut(auth).then(() => {
            // Hvis dette virker logges der ud
          }).catch((error) => {
            // Ellers udskrives en fejlmeddelelse
          });
    };
    return (
        <View style={styles.container}>
        <Text style={styles.header}> Se din profil her</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>
    );
}

//Nedenfor bruges samme styles som på andre sider
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
