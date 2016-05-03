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
import Artist from '../../components/Artist'
import ArtistModel from '../../models/Artist'


export default class Home extends ViewBase {
  constructor(props) {
    super(props)
    this.state = {
      artists: [],
      relatedArtists: [],
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
    const state = SpotifyStore.getState()
    this.setState({
      errorMessage: state.errorMessage,
      artists: state.artists,
      relatedArtists: state.relatedArtists,
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
      <HomeScreen
          artists={this.state.artists}
          onTapCreatePlaylist={this._createPlaylist.bind(this)}
      />
    )
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    let ds = new React.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      artistsDataSource: ds.cloneWithRows(this.props.artists),
    }
  }
  componentWillReceiveProps(props) {
    this.setState({artistsDataSource: this.state.artistsDataSource.cloneWithRows(props.artists)})
  }

  _renderArtist(artist) {
    return <Artist {...artist} />
  }

  render() {
    return (
      <React.ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.artistsDataSource}
        renderRow={this._renderArtist}
      />
    )
  }
}
HomeScreen.propTypes = {
  artists: React.PropTypes.arrayOf(ArtistModel.propType).isRequired,
  onTapCreatePlaylist: React.PropTypes.func.isRequired,
}
