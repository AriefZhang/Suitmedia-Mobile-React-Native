import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo, Feather } from "@expo/vector-icons";
import { setUserPage } from "./redux/action/user";
import { TouchableOpacity } from "react-native";

import Login from "./screen/Login";
import Home from "./screen/Home";
import User from "./screen/User";

const Stack = createNativeStackNavigator();

class Navigation extends Component {
  constructor(props) {
    super(props)
  }

  changeView = (payload) => {
    this.props.setUserPage(payload)
  }

  render() {
    const { userList } = this.props;
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="User"
            component={User}
            options={{
              headerRight: () =>
                userList ? (
                  <TouchableOpacity onPress={() => this.changeView(!userList)}>
                    <Entypo name="location-pin" size={24} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => this.changeView(!userList)}>
                    <Feather name="list" size={24} color="black" />
                  </TouchableOpacity>
                ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { userList } = state.userReducer;

  return {
    userList,
  };
};

export default connect(mapStateToProps, { setUserPage })(Navigation);
