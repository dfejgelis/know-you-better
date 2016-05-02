import alt from '../alt'

class SpotifyActions {
  constructor() {
    this.generateActions(
      'fetchTopArtists',
      'fetchTopArtistsSuccess',
      'fetchTopArtistsFailed'
    );
  }
}

export default alt.createActions(SpotifyActions)
