import React, { useState } from 'react';
import {
	Alert,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
	useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; 

export interface Habit {
	id: string;
	title: string;
	importance: 'Alta' | 'Media' | 'Baja';
}

const HABITS_STORAGE_KEY = '@habits';

const AddHabitScreen = ({ navigation }: { navigation: any }) => {
	const [title, setTitle] = useState('');
	const [importance, setImportance] = useState<'Alta' | 'Media' | 'Baja'>('Media');
	const colorScheme = useColorScheme(); 

	const handleAddHabit = async () => {
		if (title.trim() === '') {
			Alert.alert('Error', 'Por favor, introduce un título para el hábito.');
			return;
		}

		const newHabit: Habit = {
			id: Math.random().toString(36).substring(2, 11), 
			title,
			importance,
		};

		try {
			const jsonValue = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
			const habits = jsonValue != null ? JSON.parse(jsonValue) : [];
			await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify([...habits, newHabit]));
			navigation.navigate('HabitList'); // Redirigir a la lista de hábitos
		} catch (e) {
			console.error('Error al guardar hábito: ', e);
		}
	};

	return (
		<View style={[styles.container, colorScheme === 'dark' ? styles.containerDark : styles.containerLight]}>
			<Text style={[styles.title, colorScheme === 'dark' ? styles.textDark : styles.textLight]}>
				Agregar Hábito
			</Text>
			<TextInput
				style={[styles.input, colorScheme === 'dark' ? styles.inputDark : styles.inputLight]}
				placeholder="Título del hábito"
				placeholderTextColor={colorScheme === 'dark' ? 'lightgray' : 'gray'} 
				value={title}
				onChangeText={setTitle}
			/>

			
			<View style={styles.pickerContainer}>
				<Text style={[styles.importanceLabel, colorScheme === 'dark' ? styles.textDark : styles.textLight]}>
					Importancia:
				</Text>
				<Picker
					selectedValue={importance}
					style={[styles.picker, colorScheme === 'dark' ? styles.pickerDark : styles.pickerLight]}
					onValueChange={(itemValue: 'Alta' | 'Media' | 'Baja') => setImportance(itemValue)} 
				>
					<Picker.Item label="Alta" value="Alta" />
					<Picker.Item label="Media" value="Media" />
					<Picker.Item label="Baja" value="Baja" />
				</Picker>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={handleAddHabit} style={styles.addButton}>
					<Text style={styles.addButtonText}>Guardar</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('HabitList')} // Redirigir a la lista de hábitos
				 style={styles.cancelButton}> 
					<Text style={styles.cancelButtonText}>Cancelar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	containerLight: {
		backgroundColor: '#f5f5f5',
	},
	containerDark: {
		backgroundColor: '#121212',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	textLight: {
		color: 'black',
	},
	textDark: {
		color: 'white',
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
	},
	inputLight: {
		borderColor: 'gray',
	},
	inputDark: {
		borderColor: 'white',
		backgroundColor: '#1f1f1f', 
		color: 'white', 
	},
	pickerContainer: {
		marginBottom: 20,
	},
	importanceLabel: {
		marginBottom: 5,
	},
	picker: {
		height: 50,
		width: '100%',
	},
	pickerLight: {
		color: 'black',
		backgroundColor: '#b5b5b5',
	},
	pickerDark: {
		color: 'white',
		backgroundColor: '#1f1f1f', 
	},
	addButton: {
		backgroundColor: '#2E86C1', 
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		marginRight: 10,
		width: 100, 
	},
	cancelButton: {
		backgroundColor: '#C0392B', 
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		width: 100, 
	},
	cancelButtonText: {
		color: 'white',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end', 
	},
	addButtonText: {
		color: 'white', 
	},
});

export default AddHabitScreen;
