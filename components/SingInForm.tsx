import { View, TextInput } from "react-native";


export default function SingIn() {
    return (
        <View>
            <TextInput placeholder="Ingrese su nombre de usuario" style={{backgroundColor:"white",margin:5,height:40,width:200}}/>
            <TextInput placeholder="Ingrese su contraseña" secureTextEntry={true} style={{backgroundColor:"white",margin:5,height:40,width:200}}/>
            <TextInput placeholder="Confirma tu contraseña" secureTextEntry={true} style={{backgroundColor:"white",margin:5,height:40,width:200}}/>
        </View>
    );
}