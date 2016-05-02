'use strict'

import React from 'react-native'
import ViewBase from '../ViewBase'

import styles from './WelcomeStyles'


export default class Home extends ViewBase {
  _onPressSpotifyLogin() {
    this.props.navigator.push({
      id: 'loginSpotify',
      title: 'Request Spotify Permission',
    })
  }

  render() {
    return (
      <React.View style={styles.container}>
        <React.Text style={styles.header}>CREATE THE MOST AWESOME PLAYLIST based on your Spotify information.</React.Text>
        <React.Text style={styles.bullets}>
          <React.Text>* Login</React.Text>
          <React.Text>* We'll find the best new artists for you (customizable)</React.Text>
          <React.Text>* That's it! Now you have a new playlist with your best new artists top tracks!</React.Text>
        </React.Text>
        <React.TouchableHighlight
            style={styles.loginButton}
            onPress={this._onPressSpotifyLogin.bind(this)}>
          <React.Text style={styles.loginButtonText}>Sign in Spotify</React.Text>
        </React.TouchableHighlight>
      </React.View>
    )
  }
}
