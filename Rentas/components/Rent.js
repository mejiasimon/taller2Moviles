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
          setMessage("vehiculo rentado")
      setColor("green")
          break
        }
        }
    }
    else{
      setMessage("ese vehiculo ya esta siendo arrendado")
      setColor("red")
    }
  
  }else{
    setMessage("no existe un vehiculo para renta con esa placa ")
    setColor("red")
  }
}
else{
  setMessage("ese Usuario no existe")
  setColor("red")
}

    }
    return(
        <View style={{flex:1,justifyContent: "center",alignItems: "center",flexDirection: "column"}}>
        <Image
        style={{ height: "12.5rem", width: "12.5rem" }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/car-rental.png?alt=media&token=15068230-1012-488f-9313-ee5ffcae5095",
        }}
      ></Image>

<Controller
        control={control}
        rules={{
          required: true,
          minLength:6,
          maxLength:12,
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
        <Text style={{ color: "red" }}>el numero de renta es requerido</Text>
      )}
      {errors.rentNumber?.type == "pattern" && (
        <Text style={{ color: "red" }}>debe ingresar solo numeros</Text>
      )}
       {errors.rentNumber?.type == "minLength" && (
        <Text style={{ color: "red" }}>el numero de renta debe tener 6 caracteres</Text>
      )}
       {errors.rentNumber?.type == "maxLength}" && (
        <Text style={{ color: "red" }}>el numero de renta no puede ser mayor a 12 caracteres</Text>
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
        <Text style={{ color: "red" }}>tu nombre es requerido</Text>
      )}
        {errors.User?.type == "pattern" && (
        <Text style={{ color: "red" }}>solo se aceptan letras</Text>
      )}


<Controller
        control={control}
        rules={{
          required: true,
          pattern: /^([A-Z]{3}-\d{3,4})$/,
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
        <Text style={{ color: "red" }}>tu placa es requerida</Text>
      )}
   {errors.Plate?.type == "pattern" && (
        <Text style={{ color: "red" }}>la placa debe tener el formarto ABC-123</Text>
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
        <Text style={{ color: "red" }}>la fecha de renta es requerida</Text>
      )}
   {errors.rentDate?.type == "pattern" && (
        <Text style={{ color: "red" }}>la fecha debe tener el formarto dd-mm-aaaa</Text>
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
          label="crear"
          style={styles.button}
          icon="login"
          onPress={handleSubmit(Rentar)}
        ></Button>
      </View>

        </View>

    )
}