'use strict'

import React, {
  Text,
  View,
} from 'react-native'
import ViewBase from '../ViewBase'
import styles from './ArtistsStyles'
import SpotifyStore from '../../stores/SpotifyStore'
import SpotifyActions from '../../actions/SpotifyActions'
import ArtistList from '../../components/ArtistList'
import Button from '../../components/Button'
import Loader from '../../components/Loader'


export default class Artists extends ViewBase {
  constructor(props) {
    super(props)
    this.state = {
      artists: [],
      relatedArtists: [],
      errorMessage: null,
    }
  }

  _buildPlaylist() {
    // Go check it out
    this.props.navigator.push({
      id: 'createPlaylist',
      title: 'Create awesome playlist',
    })
  }

  componentDidMount() {
    SpotifyStore.listen(this.onChange.bind(this))

    SpotifyActions.fetchTopArtists()
    // this.onChange()
  }

  componentWillUnmount() {
    SpotifyStore.unlisten(this.onChange)
  }

  onChange() {
    const state = SpotifyStore.getState()
    console.debug('changed state', state)
    this.setState({
      errorMessage: state.errorMessage,
      artists: state.artists,
      relatedArtists: state.relatedArtists,
    })
  }

  render() {
    if (this.state.errorMessage) {
      console.warn(this.state.errorMessage)
    }
    if (!this.state.artists.length) {
      return <Loader text='Checking your top artists' />
    }
    if (!this.state.relatedArtists.length) {
      return <Loader text='Discovering new artists' />
    }
    return (
      <React.View style={styles.container}>
        <React.Text style={styles.title}>These are you top related artists</React.Text>
        <ArtistList artists={this.state.relatedArtists} />
        <Button text="Discover Playlist" onPress={this._buildPlaylist.bind(this)}></Button>
      </React.View>
    )
  }
}
