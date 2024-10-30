import LogInForm from '@/components/LogInForm';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, View, Text} from 'react-native';


export default function HomeScreen() {
  return (
    
      <View style={styles.container}>
        <StatusBar style='auto'/>
        <LogInForm/>
        <Pressable
            style={{backgroundColor:"white",width:115,borderRadius:10,margin:10}}
            onPress={()=>alert('Pasando a la pantalla de registro')}>
                <Text>
                    Registrate
                </Text>
        </Pressable>
      </View>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container:{
    flex:1,
    backgroundColor:'#fd0a60',
    alignItems:'center',
    justifyContent:'center',
  }
});
