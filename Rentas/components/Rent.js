import {
    Text,
    View,
    Colors,
    Image,
    BaseInput,
    Button,
  } from "react-native-ui-lib";
  import { Controller, useForm } from "react-hook-form";
  import { useState } from "react";
  import { TextInput } from "react-native-paper";
  import { styles } from "../styles/styles";
import User from "./User";
  const rents=[]
export default function Rent({navigation,route}){
    let copia=route.params.vehiculo
    let copia2=route.params.user
    function RentObject(RentNumberObject, UserObject, PlateObject,rentDate) {
      this.rentNumber = RentNumberObject
      this.User = UserObject
      this.plate=PlateObject
      this.rentDate=rentDate
    }
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      defaultValues: {
        rentNumber:"",
        User:"",
        Plate:"",
        rentDate:"",
      },
    });

    function Rentar(data){
      console.log(data)
      var plateS=data.Plate
      var rentNumberS=data.rentNumber
      var UserS=data.User
      var rentDateS=data.rentDate
      var NombreS=data.User
let filter1=copia.filter(({plate,brand,state})=>{
  return plate==plateS
})
let filter2=copia.filter(({plate,brand,state})=>{
  return state==1 && plate==plateS
})
let filter3=copia2.filter(({email,password,nombre})=>{
  return nombre==UserS
})
if(filter3[0]){
  if(filter1[0]){
    if(filter2[0]){
      for (let index = 0; index < copia.length; index++) {
        if (copia[index].plate == plateS){
          var rent=new RentObject(rentNumberS,UserS,plateS,rentDateS)
          rents.push(rent)
          copia[index].state=0
          setMessage("rentado con exito")
      setColor("green")
          break
        }
        }
    }
    else{
      setMessage("no es posible rentar este vehiculo")
      setColor("red")
    }
  
  }else{
    setMessage("no existe uese vehiculo")
    setColor("red")
  }
}
else{
  setMessage("este usuario no se encuentra registrado")
  setColor("red")
}
    }
    function verVehiculos(){
      navigation.navigate("vehiculos",{vehiculos:copia})
    }
    return(
        <View style={{        backgroundColor:"black",flex:1,justifyContent: "center",alignItems: "center",flexDirection: "column"}}>
        <Image
        style={{ height: "150px", width: "400px",marginBottom:"30px" }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/pngegg%20(1).png?alt=media&token=ebca1eb4-33ba-44e2-9efd-9badf2fa5207",
        }}
      ></Image>

<Controller
        control={control}
        rules={{
          required: true,
          minLength:6,
          pattern:
          /^[0-9]+$/,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            label="rentNumber"
            right={<TextInput.Icon icon="car" />}
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="rentNumber"
      ></Controller>
      {errors.rentNumber?.type == "required" && (
        <Text style={{ color: "red" }}>hace falta el numero de renta</Text>
      )}
      {errors.rentNumber?.type == "pattern" && (
        <Text style={{ color: "red" }}>solo numeros admitidos</Text>
      )}
       {errors.rentNumber?.type == "minLength" && (
        <Text style={{ color: "red" }}>la contraseña debe tener como minimo 6 caracteres</Text>
      )}
    
      <Controller
        control={control}
        rules={{
          required: true,
          pattern:/^[A-Z]+$/i,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            style={{ marginTop: 20 }}
            label="User"
            onChangeText={onChange}
            value={value}
            right={
              <TextInput.Icon
              icon="account"
              />
            }
          />
        )}
        name="User"
      ></Controller>
          {errors.User?.type == "required" && (
        <Text style={{ color: "red" }}>hace falta el nombre</Text>
      )}
        {errors.User?.type == "pattern" && (
        <Text style={{ color: "red" }}>solo letras admitidas</Text>
      )}


<Controller
        control={control}
        rules={{
          required: true,
          pattern: /^([A-Z]{3}\d{3,4})$/,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            style={{ marginTop: 20 }}
            label="plate"
            onChangeText={onChange}
            value={value}
            right={
              <TextInput.Icon
              icon="car"
              />
            }
          />
        )}
        name="Plate"
      ></Controller>
          {errors.Plate?.type == "required" && (
        <Text style={{ color: "red" }}>hace falta la placa</Text>
      )}
   {errors.Plate?.type == "pattern" && (
        <Text style={{ color: "red" }}>la placa debe tener la forma ABC123</Text>
      )}


<Controller
        control={control}
        rules={{
          required: true,
          pattern: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            style={{ marginTop: 20 }}
            label="date"
            onChangeText={onChange}
            value={value}
            right={
              <TextInput.Icon
              icon="calendar"
              />
            }
          />
        )}
        name="rentDate"
      ></Controller>
          {errors.rentDate?.type == "required" && (
        <Text style={{ color: "red" }}>hace falta la fecha de renta</Text>
      )}
   {errors.rentDate?.type == "pattern" && (
        <Text style={{ color: "red" }}>la fecha debe tener el formarto internacional dd-mm-aaaa</Text>
      )}


      <Text style={{ color: `${color}`, textAlign: "center" }}>{message}</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: "1.875rem",
        }}
      >
        <Button
          label="rentar"
          style={styles.button}
          icon="login"
          onPress={handleSubmit(Rentar)}
        ></Button>
           <Button
          label="ver vehiculos"
          style={styles.button}
          icon="login"
          onPress={verVehiculos}
        ></Button>
      </View>

        </View>

    )
}