import alt from '../alt'

class SpotifyActions {
  constructor() {
    this.generateActions(
      'setCredentials',
      'fetchTopArtists',
      'fetchTopArtistsSuccess',
      'fetchTopArtistsFailed',
      'discoverArtists',
      'discoverArtistsSuccess',
      'discoverArtistsFailed',
      'fetchTopTracks',
      'fetchTopTracksSuccess',
      'fetchTopTracksFailed',
      'createPlaylist',
      'createPlaylistSuccess',
      'createPlaylistFailed'
    )
  }
}

export default alt.createActions(SpotifyActions)
