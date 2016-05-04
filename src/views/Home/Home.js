'use strict'

import React, {
  Text,
  View,
} from 'react-native'
import ViewBase from '../ViewBase'
import styles from './HomeStyles'
import SpotifyStore from '../../stores/SpotifyStore'
import SpotifyActions from '../../actions/SpotifyActions'
import ArtistList from '../../components/ArtistList'
import TrackList from '../../components/TrackList'
import Button from '../../components/Button'


export default class Home extends ViewBase {
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
    // Create playlist
    SpotifyActions.fetchTopTracks()
    // Go check it out
    this.props.navigator.push({
      id: 'playlist',
      title: 'This is your awesome playlist',
    })
  }

  componentDidMount() {
    this._fetchArtists()
    SpotifyStore.listen(this.onChange.bind(this))
  }

  componentWillUnmount() {
    SpotifyStore.unlisten(this.onChange)
  }

  onChange() {
    const state = SpotifyStore.getState()
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

  _renderLoader(text) {
    return (
        <React.View style={styles.loadingContainer}>
          <React.Text style={styles.loadingText}>{text}</React.Text>
          <React.ActivityIndicatorIOS style={styles.loader}/>
        </React.View>
    )
  }

  render() {
    if (this.state.errorMessage) {
      console.warn(this.state.errorMessage)
    }
    if (!this.state.artists.length) {
      return this._renderLoader('Checking your top artists')
    }
    if (!this.state.relatedArtists.length) {
      return this._renderLoader('Discovering new artists')
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
