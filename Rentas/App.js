
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import User from "./components/User";
import Rent from "./components/Rent";
import Car from "./components/Car";
const Stack=createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Car" component={Car} />
      <Stack.Screen name="Rent" component={Rent} />
    </Stack.Navigator>
  </NavigationContainer>

  )
}

