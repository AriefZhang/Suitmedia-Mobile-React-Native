import { Component } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal
} from "react-native";

let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;

export default class Login extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        name: "",
        palindrome: "",
        isPalindrome: "",
        modalVisible: false
      }),
      (this.handleChange = this.handleChange.bind(this));
    this.palindrome = this.palindrome.bind(this);
  }

  handleChange(text) {
    this.setState({ name: text });
  }

  palindrome(text) {
    this.setState({ palindrome: text });
  }

  setModalVisible = (visible) => {
    let check = this.state.palindrome.toLowerCase()

    let count = 0
    for (let i = 0; i < check.length; i++) {
      if (check[i] == check[check.length - 1 - i]) count++
    }
    if (check.length == 0) this.setState({isPalindrome: "Please input Text on Palindrome!"})
    else if (check.length == count) this.setState({isPalindrome: "Text was a Palindrome!"})
    else this.setState({isPalindrome: "Text was not a Palindrome!"})

    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.imgBackground}
          source={{
            uri: "https://www.stockvault.net/data/2020/10/02/279352/preview16.jpg",
          }}
        ></ImageBackground>
         <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.state.isPalindrome}</Text>
              <TouchableOpacity onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
                this.setState({palindrome: ""})
                }}>
                <View style={styles.buttonClose}>
                  <Text style={styles.text}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.imgBorder}>
          <Entypo style={styles.loginIcon} name="add-user" size={42} color="white" />
          <Image />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={this.handleChange}
          value={this.state.name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={this.palindrome}
          value={this.state.palindrome}
          placeholder="Palindrome"
        />
        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <View style={styles.mainButton}>
            <Text style={styles.text}>CHECK</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', this.state.name)}>
          <View style={styles.mainButton}>
            <Text style={styles.text}>NEXT</Text>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(43, 99, 123, 1)",
  },
  input: {
    height: 39.88,
    width: 310,
    borderRadius: 12,
    margin: 12,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  mainButton: {
    height: 39.88,
    width: 310,
    borderRadius: 12,
    margin: 12,
    padding: 10,
    backgroundColor: "rgba(43, 99, 123, 1)",
  },
  text: {
    color: "#FFFFFF",
    alignSelf: "center",
  },
  imgBorder: {
    position: 'relative',
    borderRadius: 58,
    width: 116,
    height: 116,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    overflow: "hidden",
    marginBottom: 58.12,
    alignSelf: "center",
    display: "flex"
  },
  imgBackground: {
    position: "absolute",
    alignSelf: "center",
    width: windowWidth * 1,
    height: windowHeight * 1,
    overflow: "hidden",
  },
  loginIcon: {
    position: 'absolute',
    alignSelf: "center",
    top: "30%"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "rgba(43, 99, 123, 1)",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginTop: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
