import alt from '../alt'

class SpotifyActions {
  constructor() {
    this.generateActions(
      'fetchTopArtists',
      'fetchTopArtistsSuccess',
      'fetchTopArtistsFailed',
      'discoverArtists',
      'discoverArtistsSuccess',
      'discoverArtistsFailed'
    )
  }
}

export default alt.createActions(SpotifyActions)
