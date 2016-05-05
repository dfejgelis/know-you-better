'use strict'

import React from 'react-native'
import url from 'url'
import SpotifyConnect from '../../lib/SpotifyConnect'
import styles from './LoginSpotifyStyles'
import config from '../../../config'
import ViewBase from '../ViewBase'
import Loader from '../../components/Loader'
import SpotifyActions from '../../actions/SpotifyActions'


export default class LoginSpotify extends ViewBase {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      loaded: false,
    }
  }
  _LoginSpotifySuccess() {
    this.setState({ loaded: true })
    this.props.navigator.replace({
      id: 'artists',
      title: 'Artists',
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
          .then((data) => {
            this._LoginSpotifySuccess(data)
            SpotifyActions.setCredentials(data.access_token)
          })
          .catch((error) => console.warn(error))
      }
    }
  }
  render() {
    if (this.state.loading) {
      return <Loader text="Getting credentials" />
    }

    const authURL = SpotifyConnect.getAuthURL()
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
