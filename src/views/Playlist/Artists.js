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
import TrackList from '../../components/TrackList'
import Button from '../../components/Button'
import Loader from '../../components/Loader'


export default class Artists extends ViewBase {
  constructor(props) {
    super(props)
    this.state = {
      artists: [],
      relatedArtists: [],
      topTracks: [],
      errorMessage: null,
    }
  }

  _createPlaylist() {
    // Go check it out
    this.props.navigator.push({
      id: 'playlist',
      title: 'Awesome playlist',
    })
  }

  componentDidMount() {
    SpotifyStore.listen(this.onChange.bind(this))

    // TODO :: Uncomment
    this._fetchArtists()
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
      topTracks: state.topTracks,
    })
  }

  _fetchArtists() {
    SpotifyActions.fetchTopArtists()
  }

  _discoverArtists() {
    SpotifyActions.discoverArtists(this.artists)
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
        <ArtistList
          artists={this.state.relatedArtists}
          onTapCreatePlaylist={this._createPlaylist.bind(this)}
          />
        <Button text="Create Playlist" onPress={this._createPlaylist}></Button>
        <TrackList tracks={this.state.topTracks}></TrackList>
      </React.View>
    )
  }
}
//
// {!this.state.topTracks
//   ? <Button text="Create Playlist" onPress={this._createPlaylist}></Button>
//   : <TrackList tracks={this.state.topTracks}></TrackList>
// }
