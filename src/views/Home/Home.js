'use strict'

import React, {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import ViewBase from '../ViewBase'

import styles from './HomeStyles'

export default class Home extends ViewBase {
  _AuthWithSpotify() {
    this.props.navigator.push({
      id: 'login',
      title: 'Login in first',
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
