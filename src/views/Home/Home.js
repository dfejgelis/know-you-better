'use strict'

import React, {
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import ViewBase from '../ViewBase'

import styles from './HomeStyles'
import SpotifyStore from '../../stores/SpotifyStore'
import SpotifyActions from '../../actions/SpotifyActions'


export default class Home extends ViewBase {
  constructor(props) {
    super(props)
    this.state = {
      artists: [],
      errorMessage: null,
    }
  }

  _createPlaylist() {
    // Create playlist
    // Go check it out
    this.props.navigator.push({
      id: 'playlist',
      title: 'This is your awesome playlist',
    })
  }

  componentDidMount() {
    this._fetchArtists()
    SpotifyStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    SpotifyStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(SpotifyStore.getState())
    console.log('SpotifyStore state', SpotifyStore.getState())
  }

  _fetchArtists() {
    SpotifyActions.fetchTopArtists()
  }

  render() {
    if (this.state.errorMessage) {
      console.warn(this.state.errorMessage)
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableHighlight style={styles.partyBtn}
                            underlayColor={'#669694'}
                            onPress={this._createPlaylist.bind(this)}>
          <Text style={styles.simpleText}>
            Create Playlist!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
