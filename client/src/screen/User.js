import { Component } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { asyncGetUser, setLoading } from "../redux/action/user";
import MapView, { Callout, Marker } from "react-native-maps";

let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      page: 10,
      coordinate: [
        {
          id: 1,
          lat: -6.977188,
          long: 107.670363,
        },
        {
          id: 2,
          lat: -6.957236,
          long: 107.692104,
        },
        {
          id: 3,
          lat: -6.960418,
          long: 107.631127,
        },
        {
          id: 4,
          lat: -6.983226,
          long: 107.609833,
        },
        {
          id: 5,
          lat: -6.973447,
          long: 107.57304,
        },
        {
          id: 6,
          lat: -6.952211,
          long: 107.579362,
        },
        {
          id: 7,
          lat: -6.940875,
          long: 107.57645,
        },
        {
          id: 8,
          lat: -6.913505,
          long: 107.58015,
        },
        {
          id: 9,
          lat: -6.880494,
          long: 107.582754,
        },
        {
          id: 10,
          lat: -6.87326,
          long: 107.580369,
        },
        {
          id: 11,
          lat: -6.849953,
          long: 107.598872,
        },
        {
          id: 12,
          lat: -6.862487,
          long: 107.618589,
        },
      ],
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.asyncGetUser().then(() => {
      this.setState({ refreshing: false });
    });
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.cardLoop}>
        <View style={styles.borderImg}>
          <Image source={{ uri: item.avatar }} style={styles.img} />
        </View>
        <View>
          <Text style={styles.name}>
            {item.first_name} {item.last_name}
          </Text>
          <Text>{item.email}</Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.props.asyncGetUser(this.state.page);
  }

  renderFooter = () => {
    return this.props.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    ) : null;
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 10 });
    this.props.setLoading(true);
    this.props.asyncGetUser(this.state.page);
  };

  render() {
    const { users, userList } = this.props;

    return userList ? (
      <View style={styles.borderCard}>
        <FlatList
          data={users.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={this.renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        ></FlatList>
      </View>
    ) : (
      <MapView style={styles.map}>
        {this.state.coordinate.map((coor, i) => {
          return (
            <Marker
              key={i}
              coordinate={{
                latitude: coor.lat,
                longitude: coor.long,
              }}
              pinColor="red"
            >
              <Callout>
                <Text>
                  {users.data[i]?.first_name} {users.data[i]?.last_name}
                </Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    );
  }
}

const mapStateToProps = (state) => {
  const { users, isLoading, userList } = state.userReducer;

  return {
    users,
    isLoading,
    userList,
  };
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  borderCard: {
    alignItems: "center",
  },
  borderImg: {
    alignItems: "center",
    width: 49,
    height: 49,
    borderRadius: 25,
    overflow: "hidden",
    margin: 16,
  },
  cardLoop: {
    flexDirection: "row",
    alignItems: "center",
    width: 335,
    height: 80,
    borderBottomColor: "rgba(100, 100, 100, 0.2)",
    borderBottomWidth: 1,
  },
  img: {
    width: 49,
    height: 49,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: windowWidth,
    aspectRatio: windowWidth / windowHeight,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, { asyncGetUser, setLoading })(User);
