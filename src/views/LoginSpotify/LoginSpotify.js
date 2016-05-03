'use strict'

import React from 'react-native'
import url from 'url'
import SpotifyConnect from '../../lib/SpotifyConnect'
import styles from './LoginSpotifyStyles'
import config from '../../../config'


export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  _LoginSpotifySuccess() {
    this.props.navigator.replace({
      id: 'home',
      title: 'Welcome!'
    })
  }
  onNavigationStateChange(navState) {
    const urlIsCallback = navState.url.startsWith(config.spotify.redirectUri)
    if (urlIsCallback) {
      const urlObject = url.parse(navState.url, true)

      if (urlObject.query.error) {
        this.setState({ error: urlObject.query.error })
      }
      if (urlObject.query.code) {
        this.setState({ loading: true })
        SpotifyConnect.getAccessToken(urlObject.query.code)
          .then((data) => this._LoginSpotifySuccess(data))
          .catch((error) => console.warn(error))
      }
    }
  }
  render() {
    if (this.state.loading) {
      return <React.Text>Loading</React.Text>
    }

    const scope = "user-top-read"
    // const scope = ['playlist-read-private',
    // 'playlist-read-collaborative',
    // 'playlist-modify-public',
    // 'playlist-modify-private',
    // 'user-library-read',
    // 'user-library-modify',
    // 'user-read-private',
    // 'user-read-birthdate',
    // 'user-read-email',
    // 'user-follow-read',
    // 'user-follow-modify',
    // 'user-top-read'].join(' ')
    const authURL = SpotifyConnect.getAuthURL(scope)
    console.log('authurl', authURL)
    const WEBVIEW_REF = 'webview'

    return (
      <React.WebView
        ref={WEBVIEW_REF}
        automaticallyAdjustContentInsets={false}
        style={styles.webView}
        source={{uri: authURL}}
        javaScriptEnabled
        domStorageEnabled
        decelerationRate="normal"
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        startInLoadingState
        scalesPageToFit
      />
    )
  }
}
