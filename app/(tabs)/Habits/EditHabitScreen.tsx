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

const EditHabitScreen = ({ route, navigation }: { route: any; navigation: any }) => {
	// const { habit } = route.params;  Obtener el hábito a editar de los parámetros de navegación a esta pantalla

    const habit: Habit = {
        id: '1',
        title: 'Hábito de prueba',
        importance: 'Alta',
    };
      

	const [title, setTitle] = useState(habit.title);
	const [importance, setImportance] = useState<'Alta' | 'Media' | 'Baja'>(habit.importance);
	const colorScheme = useColorScheme(); 

	const handleEditHabit = async () => {
		if (title.trim() === '') {
			Alert.alert('Error', 'Por favor, introduce un título para el hábito.');
			return;
		}

		const updatedHabit: Habit = { ...habit, title, importance };

		try {
			const jsonValue = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
			if (jsonValue != null) {
				const habits = JSON.parse(jsonValue);
				const updatedHabits: Habit[] = habits.map((h: Habit) => (h.id === habit.id ? updatedHabit : h));
				await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
				navigation.navigate('HabitList'); // Redirigir a la lista de hábitos
			}
		} catch (e) {
			console.error('Error al actualizar hábito: ', e);
		}
	};

	return (
		<View style={[styles.container, colorScheme === 'dark' ? styles.containerDark : styles.containerLight]}>
			<Text style={[styles.title, colorScheme === 'dark' ? styles.textDark : styles.textLight]}>
				Editar Hábito
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
				<TouchableOpacity onPress={handleEditHabit} style={styles.addButton}>
					<Text style={styles.addButtonText}>Guardar</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('HabitList')} style={styles.cancelButton}> 
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

export default EditHabitScreen;
