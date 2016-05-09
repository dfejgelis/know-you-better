'use strict'

import React from 'react-native'
import ArtistsView from '../views/Artists'
import CreatePlaylistView from '../views/CreatePlaylist'
import WelcomeView from '../views/Welcome'
import LoginSpotifyView from '../views/LoginSpotify'


export default function renderScene(route, navigator) {
    switch (route.id) {
      case 'welcome':
        return (<WelcomeView navigator={navigator} {...route.data} />)
      case 'loginSpotify':
        return (<LoginSpotifyView navigator={navigator} {...route.data} />)
      case 'artists':
        return (<ArtistsView navigator={navigator} {...route.data} />)
      case 'createPlaylist':
        return (<CreatePlaylistView navigator={navigator} {...route.data} />)
      default:
        return (
          <React.Text style={{fontSize: 40, color: 'red'}}>
            Oops, route error '{route.id}'
          </React.Text>
        )
    }
  }
