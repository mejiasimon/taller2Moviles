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

console.log(Usuarios)
const Usuarios = [];
export default function User({ navigation }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name:""
    },
  });
  function UserObject(emailObject, passwordObject, nombreObject) {
    this.email = emailObject;
    this.password = passwordObject;
    this.nombre = nombreObject;
  }
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  function handleSignIn(data) {
    let mailS = data.email;
    let passwordS = data.password;
    var find = Usuarios.filter(({ email, password, nombre }) => {
      return email == mailS && password == passwordS;
    });
    if (find[0]) {
      navigation.navigate("Car",{user:Usuarios});
    }
    else{
      setMessage("no existe ese usuario")
      setColor("red")
    }
  }

  function handleRegister(data) {
    console.log(data);
    let mailS = data.email;
    let passwordS = data.password;
    let nameS=data.name;
    var find = Usuarios.filter(({ email, password, nombre }) => {
      return email == mailS && password == passwordS;
    });
    if (!find[0]) {
      var Usuario = new UserObject(mailS, passwordS, nameS);
      Usuarios.push(Usuario);
      setMessage("usuario creado");
      setColor("green");
      console.log(Usuarios);
    } else {
      setMessage("ya existe ese usuario");
      setColor("red");
    }
  }

  return (
    <View
      flex
      style={{
        backgroundColor:"black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image
        style={{ height: "12.5rem", width: "12.5rem" }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/renting-63833.appspot.com/o/pngwing.com.png?alt=media&token=b479ed99-7297-486f-aade-d1807512da95",
        }}
      ></Image>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern:
            /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            label="correo electronico"
            onChangeText={onChange}
            value={value}
          ></TextInput>
        )}
        name="email"
      ></Controller>
      {errors.email?.type == "required" && (
        <Text style={{ color: "white" }}>hace falta el correo</Text>
      )}
      {errors.email?.type == "pattern" && (
        <Text style={{ color: "white" }}>debe ingresar un correo valido</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 6,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoFocus
            style={{ marginTop: 20 }}
            label="Contraseña"
            secureTextEntry={true}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      ></Controller>
          {errors.password?.type == "required" && (
        <Text style={{ color: "white" }}>hace falta la contraseña</Text>
      )}
      {errors.password?.type == "minLength" && (
        <Text style={{ color: "white" }}>la contraseña debe tener como minimo 6 caracteres</Text>
      )}
<Controller
control={control}
rules={{
  required:true,
  pattern:/^[A-Z]+$/i
}}
render={({ field: { onChange, value } }) => (
  <TextInput
  style={{ marginTop: 20 }}
  label="nombre de usuario"
  onChangeText={onChange}
  value={value}
/> 
)}
name="name"
>
</Controller>
{errors.name?.type == "required" && (
        <Text style={{ color: "white" }}>hace falta el nombre</Text>
      )}
      {errors.name?.type == "pattern" && (
        <Text style={{ color: "white" }}>solo letras admitidas</Text>
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
          label="iniciar sesion"
          icon="account"
          style={styles.button}
          onPress={handleSubmit(handleSignIn)}
        ></Button>
        <Button
          label="Registrarse"
          style={styles.button}
          onPress={handleSubmit(handleRegister)}
        ></Button>
      </View>
    </View>
  );
}
