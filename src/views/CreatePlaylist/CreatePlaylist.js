'use strict'

import React from 'react-native'
import ViewBase from '../ViewBase'
import styles from './CreatePlaylistStyles'
import SpotifyStore from '../../stores/SpotifyStore'
import SpotifyActions from '../../actions/SpotifyActions'
import TrackList from '../../components/TrackList'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import SpotifyButton from '../../components/SpotifyButton'
import config from '../../../config'


export default class CreatePlaylist extends ViewBase {
  constructor(props) {
    super(props)
    this.state = {
      topTracks: [],
      errorMessage: null,
      created: false,
      playlistName: config.spotify.playlistNameDefault,
      playlist: null,
    }
  }

  _createPlaylist() {
    SpotifyActions.createPlaylist(this.state.playlistName, SpotifyStore.getState().topTracks)
    this.setState({created: true})
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
      playlist: state.playlist,
    })
  }

  _renderForm() {
    return (
      <React.View>
        <React.TextInput
          style={styles.inputText}
          onChangeText={(text) => this.setState({ playlistName: text })}
          value={this.state.playlistName}
          />
        <Button text="Create Playlist" onPress={() => this._createPlaylist()}></Button>
      </React.View>
    )
  }

  _renderSpotifyButton() {
    const uri = (this.state.playlist ? this.state.playlist.uri : '')
    return (
      <SpotifyButton
        text="Open in Spotify"
        uri={uri}
        />
    )
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
        {!this.state.created
          ? this._renderForm()
          : this._renderSpotifyButton()
        }
        <TrackList tracks={this.state.topTracks}></TrackList>
      </React.ScrollView>
    )
  }
}
