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
      'fetchTopTracksFailed'
    )
  }
}

export default alt.createActions(SpotifyActions)
