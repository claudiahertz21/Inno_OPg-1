import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUpForm() {
    //Definition af forskellige state-variabler, der skal benyttes i SignUpForm
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    
    const auth = getAuth()
    //Her defineres selve knappen med et button-element og en onPress-event, der aktiverer handleSubmit of dermed forsøger at oprette brugeren som besrkeevt nedenfor
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create user" />;
    };


    /*
    /*
    Metoden til både login og signup er den, lært i øvelserne. På et senere tidspunkt vil denne blive ændret til at være en mere sikker metode.
    nuværende opgave handlede dog om at lære React Native, for senere at kunne bygge en loginmetode op på egen måde vurderet efter app'ens behov
    Metoden bruger firebase til at håndtere login og signup, med indbyggede funtkioner som SignInWithEmailAndPassword og createUserWithEmailAndPassword.
    createUserWithEmailAndPassword tager indtastet email og password som paramertre og opretter brugeren i databasen hvis dette er muligt.
    Skulle dette slå fejl (fx ved forkert password) vil der blive fremsat en fejlmeddelelse, som udskrives i en tekstkomponent.
    
*/
      const handleSubmit = async() => {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          //Ved fejl:
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage)
        });
      }

      //I return findes en tekstkomponent, der angiver at dette er sign up form. Denne kaldes i app.js og vises på skærmen
      //Består af to inputfelter hvor brugeren indtaster email og password. Disse sætter løbende værdien af state-variablerne, email og password.
      // Sker en fejl vises denne her

    return (
        <View>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

//Styling med css
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: 300
    },
    header: {
        fontSize: 40,
    },
});

//Eksport af Loginform, således denne kan importeres og benyttes i andre filer
export default SignUpForm