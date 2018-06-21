

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {

        title: '主页',
        headerRight: (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
          />
        ),
        headerLeft: (
          <Button
            onPress={() => navigation.navigate('MyModal')}
            title="modal"
            color="#fff"
          />
        ),
      }
    }
    render() {
      return (
          <View style={styles.container}>
            <Text>post内容</Text>
            <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Details')}
          />
          </View>
      );
    }
  }

  class SettingsScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
      );
    }
  }


  class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        title: '详情页',
        headerRight: (
          <Button
            onPress={navigation.getParam('increaseCount')}
            title="+1"
            color="#fff"
          />
        ),
      };
    }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen {this.state.count || 0}</Text>
        </View>
      );
    }
    componentDidMount() {
      this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    state = {
      count: 0,
    };

    _increaseCount = () => {
      this.setState({ count: this.state.count + 1 });
    }
  }