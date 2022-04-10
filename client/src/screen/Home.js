import { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.page}>
          <View style={styles.welcome_up}>
            <Text style={styles.bold}>Welcome</Text>
          </View>
          <View style={styles.welcome_bot}>
            <Text style={styles.name}>{this.props.route.params}</Text>
          </View>
        </View>
        <View style={styles.imgBorder}>
          <Image />
          <Entypo style={styles.icon} name="user" size={160} color="ivory" />
        </View>
        <Text style={styles.center}>Select a user to show the profile</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
          <View style={styles.user}>
            <Text style={styles.text}>Choose a user</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  center: {
    textAlign: "center",
    marginBottom: windowHeight * 0.28,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 36,
  },
  imgBorder: {
    position: "relative",
    borderRadius: 82,
    width: 164,
    height: 164,
    backgroundColor: "rgba(100, 100, 100, 0.5)",
    overflow: "hidden",
    marginBottom: 35,
    alignSelf: "center",
    display: "flex",
  },
  icon: {
    alignItems: 'flex-end',
    justifyContent: "center",
    marginTop: 10
  },
  page: {
    position: "relative",
    flex: 1,
  },
  bold: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 36,
  },
  welcome_up: {
    position: "absolute",
    left: 21,
    top: 13,
  },
  welcome_bot: {
    position: "absolute",
    left: 21,
    top: 35,
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 36,
  },
  user: {
    height: 41,
    width: 310,
    borderRadius: 12,
    margin: 12,
    padding: 10,
    backgroundColor: "rgba(43, 99, 123, 1)",
    alignSelf: "center",
  },
  text: {
    color: "#FFFFFF",
    alignSelf: "center",
  },
});
