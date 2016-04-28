'use strict'

import React, {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import styles from './HomeStyles'

class Home extends React.Component {
  _AuthWithSpotify() {
    this.props.navigator.push({
      id: 'login',
      title: 'Login in first'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableHighlight style={styles.partyBtn}
                            underlayColor={'#669694'}
                            onPress={this._AuthWithSpotify.bind(this)}>
          <Text style={styles.simpleText}>
            Authenticate with spotify
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Home.propTypes = {
  navigator: React.PropTypes.object.isRequired,
}
export default Home
