import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/index";
import Navigation from "./src/navigation";
import { MenuProvider } from "react-native-popup-menu";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MenuProvider>
          <Navigation />
        </MenuProvider>
      </Provider>
    );
  }
}
