'use strict'

import React from 'react-native'


export default class Login extends React.Component {
  _onPressSpotifyLogin() {
    this.props.navigator.push({
      id: 'loginSpotify',
      title: 'Request Spotify Permission'
    })
  }

  render() {
    return (
      <React.View>
        <React.TouchableHighlight onPress={this._onPressSpotifyLogin.bind(this)}>
          <React.Text>Click here to login with Spotify</React.Text>
        </React.TouchableHighlight>
      </React.View>
    )
  }
}
