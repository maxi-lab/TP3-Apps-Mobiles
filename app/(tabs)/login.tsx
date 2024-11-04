import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    useColorScheme,
} from 'react-native';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const isDarkMode = useColorScheme() === 'dark';

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Funciona');
        } catch (error) {
            console.log(error);
            alert('Fallo de inicio de sesión');
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Registrado con éxito');
        } catch (error) {
            console.log(error);
            alert('Fallo en el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
            <Text style={[styles.header, isDarkMode ? styles.headerDark : styles.headerLight]}>
                Iniciar Sesión
            </Text>

            <View style={styles.inputContainer}>
                <Text style={isDarkMode ? styles.labelDark : styles.labelLight}>Email</Text>
                <TextInput
                    style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
                    placeholder="Ingresa tu Email"
                    placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Text style={isDarkMode ? styles.labelDark : styles.labelLight}>Contraseña</Text>
                <TextInput
                    style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={signIn} disabled={loading}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={signUp} disabled={loading}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
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
    labelLight: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    labelDark: {
        fontSize: 16,
        marginBottom: 5,
        color: 'white',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    inputLight: {
        borderColor: '#ccc',
        color: '#333',
        backgroundColor: '#fff',
    },
    inputDark: {
        borderColor: '#444',
        color: '#fff',
        backgroundColor: '#222',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
