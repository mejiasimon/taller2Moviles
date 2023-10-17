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
      setColor("Green")
    }
    else{
      setMessage("ese vehiculo ya esta registrado")
      setColor("red")
    }

      }
       function NavigateRenta(){
navigation.navigate("Rent",{vehiculo:vehiculo,user:route.params.user})
       }
return(
  <View style={{flex:1,justifyContent: "center",alignItems: "center",flexDirection: "column"}}>
  <Image
  style={{ height: "100px", width: "100px",marginBottom:"10px" }}
  source={{
    uri: "https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/car-wash.png?alt=media&token=ea521cb8-2b34-4d1c-ae33-3efa9d6008a2",
  }}
></Image>
<Controller
        control={control}
        rules={{
          required: true,
          pattern:
          /^([A-Z]{3}-\d{3,4})$/,
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
        <Text style={{ color: "red" }}>la placa es requerida</Text>
      )}
      {errors.plate?.type == "pattern" && (
        <Text style={{ color: "red" }}>debe ingresar una placa valida ejm ABC-123</Text>
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
        <Text style={{ color: "red" }}>la marca del vehiculo es requerida</Text>
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
          onPress={handleSubmit(Guardar)}
        ></Button>
        <Button
          label="Rent"
          style={styles.button}
          icon="account"
          onPress={NavigateRenta}
        ></Button>
      </View>

  </View>
)
}