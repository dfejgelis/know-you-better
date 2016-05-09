'use strict'

import React from 'react-native'
import ViewBase from '../ViewBase'
import styles from './EnjoyPlaylistStyles'
import SpotifyActions from '../../actions/SpotifyActions'
import SpotifyStore from '../../stores/SpotifyStore'
import TrackList from '../../components/TrackList'
import Loader from '../../components/Loader'
import RegularText from '../../components/RegularText'


export default class EnjoyPlaylist extends ViewBase {
  constructor(props) {
    super(props)
    this.state = {
      playlist: null,
      loading: true,
    }
  }

  componentDidMount() {
    SpotifyStore.listen(this.onChange.bind(this))
    SpotifyActions.createPlaylist("My awesome playlist", SpotifyStore.getState().topTracks)
  }

  componentWillUnmount() {
    SpotifyStore.unlisten(this.onChange)
  }

  onChange() {
    const state = SpotifyStore.getState()
    // console.log('enjoy change', state)
    this.setState({
      playlist: state.playlist,
      loading: this._isLoading(state)
    })
  }

  _isLoading(state) {
    if (!state.playlist) return true
    if (!state.playlist.tracks) return true
    if (!state.playlist.tracks.items) return true
    if (state.playlist.tracks.items.length) return false

    return true
  }

  render() {
    if (this.state.errorMessage) {
      console.warn(this.state.errorMessage)
    }
    console.log('rendering', this.state)
    if (this.state.loading) {
      return <Loader text='Creating the most awesome playlist for you' />
    } else {
      return (
        <React.ScrollView style={styles.container}>
          <RegularText text="Playlist created, go check it out in spotify" />
          <TrackList tracks={this.state.playlist.tracks.items}></TrackList>
        </React.ScrollView>
      )
    }
  }
}
