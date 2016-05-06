'use strict'

import React from 'react-native'
import ViewBase from '../ViewBase'
import RegularText from '../../components/RegularText'

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
        <React.Image source={require('../../assets/img/logo.jpg')} style={styles.logo}/>
        <React.Text style={styles.header}>CREATE THE MOST AWESOME PLAYLIST based on your Spotify information.</React.Text>
        <RegularText text="1- Login" />
        <RegularText text="2- Discover the artists you should hear" />
        <RegularText text="3- Create a playlist with a couple of top tracks" />
        <RegularText text="4- Listen to youru most amazing new discovery playlist" />
        <React.TouchableHighlight
            style={styles.loginButton}
            onPress={this._onPressSpotifyLogin.bind(this)}>
          <React.Text style={styles.loginButtonText}>Sign in Spotify</React.Text>
        </React.TouchableHighlight>
      </React.View>
    )
  }
}
