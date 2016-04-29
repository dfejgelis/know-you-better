'use strict'

import React from 'react-native'
import Navigator from './nav/Navigator'
import Config from '../config.dev'

import SpotifyConnect from './lib/SpotifyConnect'
SpotifyConnect.setRedirectURI(Config.spotify.redirectUri)
SpotifyConnect.setCredentials(Config.spotify.clientId, Config.spotify.clientSecret)

class App extends React.Component {
  render() {
    return (
      <Navigator initialRoute={Config.initialRoute} />
    )
  }
}

export default App
// export default HomeSelf
