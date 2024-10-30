import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";

export default function LogInForm(){
    const [username,setUsername]=useState('');
    const [pass,setPass]=useState('');
    const validate=()=>{
        if(username=='Max'&&pass=='max'){
            alert('Iniciaando seccion')
        }else{
            alert('Datos incorrectos')
        }
    }
    return (
        <View>
            <TextInput onChangeText={setUsername} placeholder="Nombre de usuario" style={{backgroundColor:"white",margin:5,height:40,width:200}}/>
            <TextInput onChangeText={setPass} placeholder="Contraseña" secureTextEntry={true} style={{backgroundColor:"white",margin:5,height:40,width:200}}/>
            <Pressable
            style={{backgroundColor:"white",width:115,borderRadius:10,alignContent:"center",margin:10}}
            onPress={validate}>
                <Text>
                    Iniciar seccion
                </Text>
            </Pressable>
            
        </View>

    );
}