'use strict'

import React from 'react-native'
import url from 'url'
import SpotifyConnect from '../../lib/SpotifyConnect'


export default class Login extends React.Component {
  componentDidMount() {
    React.Linking.addEventListener('url', this._handleOpenURL);
  }
  componentWillUnmount() {
    React.Linking.removeEventListener('url', this._handleOpenURL);
  }
  _handleOpenURL(event) {
    const urlObject = url.parse(event.url, true)
    const authToken = urlObject.query.code
    const accessTokenCallback = (data) => {
      console.log(data)
      // this.loadData.bind(this)
    }
    SpotifyConnect.getAccessToken(authToken, accessTokenCallback)
  }
  _openAuthUrl() {
    const authURL = SpotifyConnect.getAuthURL("user-top-read")
    console.log('authURL', authURL)
    React.Linking.openURL(authURL)
      .catch(err => console.error('An error occurred', err))
  }
  loadData() {
    console.log(SpotifyConnect)
  }

  render() {
    // const at = getAccessToken(authToken)

    this._openAuthUrl()

    return (
      <React.Text style={{fontSize: 30, flex:1}}>MONO!</React.Text>
    )
  }
}
