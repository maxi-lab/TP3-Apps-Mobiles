import {
	Alert,
	FlatList,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	useColorScheme,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export interface Habit {
	id: string;
	title: string;
	importance: 'Alta' | 'Media' | 'Baja';
}

const HABITS_STORAGE_KEY = '@habits';

export default function HabitListScreen({ navigation }: { navigation: any }) {
	const [habits, setHabits] = useState<Habit[]>([]);
	const colorScheme = useColorScheme(); // Detecta el tema actual

	const loadHabits = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
			if (jsonValue != null) {
				setHabits(JSON.parse(jsonValue));
			}
		} catch (e) {
			console.error('Error al cargar hábitos: ', e);
		}
	};

	const deleteHabit = (habitId: string) => {
		Alert.alert(
			'Eliminar Hábito',
			'¿Estás seguro de que deseas eliminar este hábito?',
			[
				{ text: 'Cancelar', style: 'cancel' },
				{
					text: 'Eliminar',
					onPress: () => {
						const updatedHabits = habits.filter(habit => habit.id !== habitId);
						setHabits(updatedHabits);
						saveHabits(updatedHabits);
					},
				},
			],
		);
	};

	const deleteAllHabits = () => {
		Alert.alert(
			'Eliminar Todos los Hábitos',
			'¿Estás seguro de que deseas eliminar toda la lista?',
			[
				{ text: 'Cancelar', style: 'cancel' },
				{
					text: 'Eliminar Todo',
					onPress: () => {
						setHabits([]);
						saveHabits([]);
					},
				},
			],
		);
	};

	const saveHabits = async (newHabits: Habit[]) => {
		try {
			const jsonValue = JSON.stringify(newHabits);
			await AsyncStorage.setItem(HABITS_STORAGE_KEY, jsonValue);
		} catch (e) {
			console.error('Error al guardar hábitos: ', e);
		}
	};

	useEffect(() => {
		loadHabits();
	}, []);

	const renderItem = ({ item }: { item: Habit }) => (
		<View style={[styles.habitItem, colorScheme === 'dark' ? styles.habitItemDark : styles.habitItemLight]}>
			<View style={styles.habitInfo}>
				<Text style={[styles.habitTitle, colorScheme === 'dark' ? styles.habitTitleDark : styles.habitTitleLight]}>
					{item.title}
				</Text>
				<Text style={[styles.habitImportance, colorScheme === 'dark' ? styles.habitImportanceDark : styles.habitImportanceLight]}>
					{item.importance}
				</Text>
			</View>
			<View style={styles.habitActions}>
				<TouchableOpacity onPress={() => deleteHabit(item.id)}>
					<Ionicons name="trash" size={24} color="red" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('EditHabit', { habit: item })}>
					<Ionicons name="create" size={24} color={colorScheme === 'dark' ? 'white' : 'blue'} style={{ marginLeft: 15 }} />
				</TouchableOpacity>
			</View>
		</View>
	);
	
	return (
		<View style={[styles.container, colorScheme === 'dark' ? styles.containerDark : styles.containerLight]}>
			<Text style={[styles.header, colorScheme === 'dark' ? styles.headerDark : styles.headerLight]}>
				Lista de Hábitos
			</Text>
			<View style={styles.buttonContainer}> 
				<TouchableOpacity onPress={() => navigation.navigate('AddHabit')}>
					<Ionicons name="add-circle-outline" size={30} color={colorScheme === 'dark' ? 'white' : 'blue'} />
				</TouchableOpacity>
				<TouchableOpacity onPress={loadHabits} style={styles.refreshButton}>
					<Ionicons name="refresh-circle" size={30} color={colorScheme === 'dark' ? 'white' : 'blue'} />
				</TouchableOpacity>
				<TouchableOpacity onPress={deleteAllHabits} style={styles.deleteAllButton}>
					<Ionicons name="trash-bin" size={30} color="red" />
				</TouchableOpacity>
			</View>
			<FlatList
				data={habits}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				ListEmptyComponent={
					<Text style={styles.emptyList}>No hay hábitos pendientes</Text>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		marginBottom: 15,
		marginTop: 30,
	},
	headerLight: {
		color: '#333',
	},
	headerDark: {
		color: '#fff',
	},
	habitItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
		marginVertical: 8,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 5,
	},
	habitItemLight: {
		backgroundColor: '#fff',
		shadowColor: '#000',
	},
	habitItemDark: {
		backgroundColor: '#333',
	},
	habitInfo: {
		flex: 1,
	},
	habitTitle: {
		fontSize: 18,
	},
	habitImportance: {
		fontSize: 14,
	},
	habitTitleLight: {
		color: '#333', 
	},
	habitTitleDark: {
		color: '#fff', 
	},
	habitImportanceLight: {
		color: '#666', 
	},
	habitImportanceDark: {
		color: '#aaa',
	},
	habitActions: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 15,
	},
	refreshButton: {
		marginHorizontal: 15,
	},
	deleteAllButton: {
		marginHorizontal: 5,
	},
	emptyList: {
		textAlign: 'center',
		marginTop: 20,
		color: '#666',
	},
});
