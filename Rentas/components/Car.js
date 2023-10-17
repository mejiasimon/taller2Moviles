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
  const vehiculo=[]
export default function Car({navigation,route}){
  function CarObject(plateObject, brandObject, stateObject) {
    this.plate = plateObject
    this.brand = brandObject
    this.state=stateObject
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
      plate: "",
      brand: "",
      state:""
    },
  });
  function Guardar(data){
    let brands=data.brand
    let plates=data.plate
    let filtro=vehiculo.filter(({plate,brand,state})=>{
return brand==brands && plate==plates
    })
    if (!filtro[0]){
      var car=new CarObject(plates,brands,1)
      vehiculo.push(car)
      console.log(vehiculo)
      setMessage("vehiculo creado")
      setColor("white")
    }
    else{
      setMessage("ya tenemos ese vehiculo")
      setColor("red")
    }

      }
       function NavigateRenta(){
navigation.navigate("Rent",{vehiculo:vehiculo,user:route.params.user})
       }
return(
  <View style={{        backgroundColor:"black",flex:1,justifyContent: "center",alignItems: "center",flexDirection: "column"}}>
  <Image
  style={{ height: "200px", width: "240px",marginBottom:"10px" }}
  source={{
    uri: "https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/clipart1958534.png?alt=media&token=5d217531-8ab0-4e7f-984e-ba971a8677e5",
  }}
></Image>
<Controller
        control={control}
        rules={{
          required: true,
          pattern:
          /^([A-Z]{3}\d{3,4})$/,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            label="plate"
            right={<TextInput.Icon icon="carryout" />}
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="plate"
      ></Controller>
      {errors.plate?.type == "required" && (
        <Text style={{ color: "red" }}>hace falta la placa</Text>
      )}
      {errors.plate?.type == "pattern" && (
        <Text style={{ color: "red" }}>la placa debe tener la forma ABC123</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            style={{ marginTop: 20 }}
            label="marca"
            onChangeText={onChange}
            value={value}
            right={
              <TextInput.Icon
              icon="car"
              />
            }
          />
        )}
        name="brand"
      ></Controller>
          {errors.brand?.type == "required" && (
        <Text style={{ color: "red" }}>hace falta la marca</Text>
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
          label="guardar"
          style={styles.button}
          icon="login"
          onPress={handleSubmit(Guardar)}
        ></Button>
        <Button
          label="rentar"
          style={styles.button}
          icon="account"
          onPress={NavigateRenta}
        ></Button>
      </View>

  </View>
)
}