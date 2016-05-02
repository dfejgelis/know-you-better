import alt from '../alt'

import SpotifyActions from '../actions/SpotifyActions'
// import SpotifySource from '../sources/SpotifySource'
import SpotifyConnect from '../lib/SpotifyConnect'


const accessToken = 'BQBz_gM70UhFzQp9bAxvQgUgkJP8CtH8Awl1gDD7GspWzQmzEpn5NPPi6pBlwPiJMArsm8JQFU34O11sVbbnDcNSZRsIk-YZtCMWSf2s2chXA9rArkjS6wpua0hQoZp07OeA6MRdyrxiruS1P3xkeuI08EqZGaVzJpm4JZg2JmTsVxIPhO4aB2o9zRemOyYkRzevkEEBRwSrj63vwXTamlkivC75XoK1LsQk7U5JkqMV758nFpAnfLyNUwaxREbXLfShWYE8iymdoQHT-Ewi9YtEpbIiH_e9GRJaz5Qykmkt3O32ynjTtLev'

SpotifyConnect.setAccessData({access_token: accessToken})

class SpotifyStore {
  constructor() {
    this.artists = [];
    this.errorMessage = null;

    this.bindActions(SpotifyActions)
  }

  fetchTopArtists() {
    this.errorMessage = null
    SpotifyConnect.fetchTopArtists()
      .then((response) => {
        // console.debug('response', response)
        if (!response.ok) {
          this.fetchTopArtistsFailed('Error fetching information')
          return
        }
        return response.text()
      })
      .then((responseText) => JSON.parse(responseText))
      .catch((error) => this.fetchTopArtistsFailed(error))
      .done((data) => this.fetchTopArtistsSuccess(data))
    }

    fetchTopArtistsSuccess(data) {
      this.setState({ errorMessage: null, artists: data.items })
    }

    fetchTopArtistsFailed(error) {
      this.setState({ errorMessage: error })
    }

}

export default alt.createStore(SpotifyStore);
