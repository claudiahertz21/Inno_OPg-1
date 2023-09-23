import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Importere Firebase Services
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card } from 'react-native-paper';

//Importere vores componenter fra components mappe
import ProfileScreen from './components/ProfileScreen';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';



//Oprettes forbindelse til firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZ022pw0MIUFVQ5MqjAyEHfbuHISDVylE",
  authDomain: "fir-39f82.firebaseapp.com",
  projectId: "fir-39f82",
  storageBucket: "fir-39f82.appspot.com",
  messagingSenderId: "87416489298",
  appId: "1:87416489298:web:ddd2a75199574d9867a68b",
  measurementId: "G-2CBF5T4VPQ"
};

// Initialize Firebase

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  //Appen initialiseres
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
    // Kan den ikke det sendes en besked om det i loggen
  } else {
    console.log("Firebase not on!");
  }
 
  const auth = getAuth();

  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // Brugerhåndtering ved log in
        const uid = user.uid;
        callback({loggedIn: true, user: user});
        console.log("You are logged in!");
      } else {
        // Ellers logges der ud
        callback({loggedIn: false});
      }
    });
  }

 //Vi opbserverer om vi er logget ind eller ej
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //Her oprettes indhold til login/signup-siden
  const GuestPage = () => {
    return(
        <View style={styles.container}>
          <Text style={styles.header}>
            Velkommen til InkSpiration!
          </Text>
          <Text style={styles.paragraph}>
            Opret bruger eller Login her
          </Text>
          
          <Card style={{padding:20, margin: 20}}>
            <SignUpForm />
          </Card>
          
          <Card style={{padding:20, margin: 20}}>
            <LoginForm />
          </Card>

        </View>
    )
  }
//Defineres at hvis der er logget ind kommer vi til profile screen og hvis det fejler bliver vi på nuvæende side
  return user.loggedIn ? <ProfileScreen /> : <GuestPage/> ;

}
//Herunder bruges samme styles som gennem hele appen
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
