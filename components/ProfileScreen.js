import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tattoos from './TattooScreen';
import Profile from './ProfileScreen1';


//Funktionen profilescreen skal vise to forskellige sider og er derfor en tab navigator
function ProfileScreen () {

    const auth = getAuth();
    const user = auth.currentUser

    //Hvis der af en eller anden grund ikke skulle være muligt at fremfinde den aktive bruger, printes dette
    if (!auth.currentUser) {
        return <View><Text>Not found</Text></View>;
    }

    //I Return vises de to tabnavigatører der henviser til hhv. Tattoos of profile komponenterne (siderne)
      const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
        <Tab.Navigator> 
        <Tab.Screen name="Tattoos" component={Tattoos} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    );

}


//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default ProfileScreen