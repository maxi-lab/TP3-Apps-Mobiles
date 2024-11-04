import React, { useState } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	useColorScheme,
    Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';


	const Login = () => {
		const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Funca')
        } catch (error) {
            console.log(error);
            alert('fallo de inicio de sesion');
        } finally {
            setLoading(false);
        }
    }

    const singUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Funco todo')
        } catch (error) {
            console.log(error);
            alert('fallo de inicio de sesion');
        } finally {
            setLoading(false);
        }
    }
        

        return (
            <View style={[styles.container]}>
			<Text style={[styles.header]}>
				Iniciar Sesión
			</Text>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Email</Text>
                
				<TextInput
					style={[styles.input]}
					placeholder="Ingresa tu Email"
					placeholderTextColor="#FFFFFF"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				
				<Text style={styles.label}>Contraseña</Text>
				<TextInput
					style={[styles.input]}
					placeholder="Ingresa tu contraseña"
					placeholderTextColor="#FFFFFF"
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>

                <Button title='Login' onPress={signIn}></Button>
                <Button title='Registrarse' onPress={singUp}></Button>
			</View>

            
		</View>
        );
	};

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    containerLight: {
        backgroundColor: '#f5f5f5',
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    headerLight: {
        color: '#333',
    },
    headerDark: {
        color: '#fff',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#FFFFFF',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
    },
    inputLight: {
        borderColor: '#ccc',
        color: '#FFFFFF', // Cambiado a blanco
        backgroundColor: '#FFFFFF',
    },
    inputDark: {
        borderColor: '#444',
        color: '#FFFFFF', // Este ya estaba bien
        backgroundColor: '#FFFFFF',
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
});
