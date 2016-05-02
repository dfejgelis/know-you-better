'use strict'

import React from 'react-native'
import HomeView from '../views/Home'
import WelcomeView from '../views/Welcome'
import LoginSpotifyView from '../views/LoginSpotify'


export default function renderScene(route, navigator) {
    switch (route.id) {
      case 'welcome':
        return (<WelcomeView navigator={navigator} {...route.data} />)
      case 'loginSpotify':
        return (<LoginSpotifyView navigator={navigator} {...route.data} />)
      case 'home':
        return (<HomeView navigator={navigator} />)
      default:
        return (
          <React.Text style={{fontSize: 40, color: 'red'}}>
            Oops, route error '{route.id}'
          </React.Text>
        )
    }
  }
