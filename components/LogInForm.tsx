import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";

export default function LogInForm(){
    const [username,setUsername]=useState('')
    const handleUsrname=(e:any)=>{
        setUsername(e.target.value)
        console.log(username)
    }
    return (
        <View>
            <TextInput onChange={handleUsrname} placeholder="Nombre de usuario" style={{backgroundColor:"white",margin:5,height:40,width:200}}/>
            <TextInput placeholder="Contraseña" style={{backgroundColor:"white",margin:5,height:40,width:200}}/>
            <Pressable
            style={{backgroundColor:"white",width:115,borderRadius:10,alignContent:"center",margin:10}}
            onPress={()=>alert('Iniciando seccion como: '+username)}>
                <Text>
                    Iniciar seccion
                </Text>
            </Pressable>
            
        </View>

    );
}