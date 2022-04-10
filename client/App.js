import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/index";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/screen/Login";
import Home from "./src/screen/Home"
import User from "./src/screen/User"

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="User" component={User}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
