import { Component } from "react";
import { View, FlatList, Text, RefreshControl, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { asyncGetUser } from "../redux/action/user";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.cardLoop}>
        <View>
          <Image source={{uri: item.avatar}} style={styles.img}/>
        </View>
        <Text>{item.first_name} {item.last_name}</Text>
      </View>
    );
  };

  componentDidMount() {
    this.props.asyncGetUser();
  }

  render() {
    const { users, isLoading } = this.props
    console.log(this.props, users, "<<<<<< INI USER");

    return (
      <FlatList
        data={users.data}
        renderItem={this.renderItem}
        keyExtractor={(item , index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      ></FlatList>
    );
  }
}

const mapStateToProps = (state) => {
  const { users, isLoading } = state.userReducer;
  
  return {
    users,
    isLoading
  };
};


const styles = StyleSheet.create({
  cardLoop: {
    flexDirection: 'row'
  },
  img: {
    width: 80,
    height: 80
  }
})

export default connect(mapStateToProps, { asyncGetUser })(User);