'use strict'

import React from 'react-native'
import ViewBase from '../ViewBase'
import styles from './CreatePlaylistStyles'
import SpotifyStore from '../../stores/SpotifyStore'
import SpotifyActions from '../../actions/SpotifyActions'
import TrackList from '../../components/TrackList'
import Button from '../../components/Button'
import Loader from '../../components/Loader'


export default class CreatePlaylist extends ViewBase {
  constructor(props) {
    super(props)
    this.state = {
      topTracks: [],
      errorMessage: null,
    }
  }

  _createPlaylist() {
    // Get current user owner
    this.props.navigator.push({
      id: 'enjoyPlaylist',
      title: 'Enjoy your awesome playlist',
    })
  }

  componentDidMount() {
    SpotifyStore.listen(this.onChange.bind(this))
    SpotifyActions.fetchTopTracks()
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
      topTracks: state.topTracks,
    })
  }

  render() {
    if (this.state.errorMessage) {
      console.warn(this.state.errorMessage)
    }
    if (!this.state.topTracks.length) {
      return <Loader text='Hearing every Spotify song and selecting the best ones for you' />
    }
    return (
      <React.ScrollView style={styles.container}>
        <Button text="Create Playlist" onPress={this._createPlaylist.bind(this)}></Button>
        <TrackList tracks={this.state.topTracks}></TrackList>
      </React.ScrollView>
    )
  }
}
