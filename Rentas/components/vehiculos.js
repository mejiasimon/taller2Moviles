import {
    Text,
    View,
    Colors,
    Image,
    BaseInput,
    Button,
  } from "react-native-ui-lib";
  import { FlatList } from "react-native";
  import { Controller, useForm } from "react-hook-form";
  import { useState } from "react";
  import { TextInput,Card } from "react-native-paper";
  import { styles } from "../styles/styles";

export default function vehiculos({navigation,route}){
    var vehiculo=route.params.vehiculos
    console.log(vehiculo)

return(
<View style={{flex:1,justifyContent: "center",alignItems: "center",flexDirection: "column",backgroundColor:"black"}}>
<FlatList
                data={vehiculo}
                keyExtractor={(item) => item.plate.toString()}
                renderItem={({ item }) => (
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection:"column",backgroundColor:"white",width:"100px",bordeRadius:"20px"}}>
                    <Text >{item.plate}</Text>
                    <Text >{item.brand}</Text>
                    <Text >{item.state}</Text>
                </View>
                )}
            />
</View>
)
}
