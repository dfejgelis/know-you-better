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
  accessTokenCallback(data) {
    console.log('callback!', data, arguments)
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
        SpotifyConnect.getAccessToken(urlObject.query.code, this.accessTokenCallback.bind(this))
      }
    }
  }
  render() {
    const authURL = SpotifyConnect.getAuthURL("user-top-read")
    const WEBVIEW_REF = 'webview'

    if (this.state.loading) {
      return <React.Text>Loading</React.Text>
    }

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
