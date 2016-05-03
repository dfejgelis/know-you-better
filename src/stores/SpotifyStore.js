import alt from '../alt'

import SpotifyActions from '../actions/SpotifyActions'
// import SpotifySource from '../sources/SpotifySource'
import SpotifyConnect from '../lib/SpotifyConnect'


const accessToken = 'BQBohXI2YpdQ0Gpsq3lNYutVgzCo17Ukb880gXIR2gBRdZ4x_-KxjzvH9yX06oXGe4L1REeg3IOIrDbtcrrKFH9SZOBm26qJdq8VBwHULtZZvFArg2UTGQ-trWop9jZryaYjCjWvh7On8Fy36ZSNcQnv4NiLr1hRmwCv_6waiBQszvKZcqLRJAoZbUiTg75QFaHRTuHwPQa42AXCAiB7fmGw3yRDlaVQ9U_2XuoW5LtNQ2ko5e9gSUEvuI-3xwALovDuE9rfeb4yLbxYJh7Enpgv2H8HqeUeiJosSHqeEiWPd0UPMb7QttCc'
SpotifyConnect.setAccessData({access_token: accessToken})

class SpotifyStore {
  constructor() {
    this.artists, this.relatedArtists = [], [];
    this.errorMessage = null;

    this.bindActions(SpotifyActions)
  }

  fetchTopArtists() {
    this.errorMessage = null
    SpotifyConnect.fetchTopArtists()
      .catch((error) => this.fetchTopArtistsFailed(error))
      .done((data) => this.fetchTopArtistsSuccess(data))
  }

  fetchTopArtistsSuccess(data) {
    this.setState({ errorMessage: null, artists: data.items })
    SpotifyActions.discoverArtists()
  }

  fetchTopArtistsFailed(error) {
    this.setState({ errorMessage: error })
  }

  discoverArtists() {
    this.errorMessage = null
    const promises = SpotifyConnect.discovertArtists(this.artists.slice(1, 3).map((artist) => artist.id))
    Promise.all(promises)
      .catch((error) => this.discoverArtistsFailed(error))
      // We have an array of 'artists' with information
      .then((relatedResults) =>
        relatedResults.map((relatedResult) =>
          relatedResult.artists.map((artist) => artist.id)
        )
      )
      // Now we have an array of arrays of ids
      .then((relatedResultsIds) => {
        const results = []
        return relatedResultsIds.forEach((arrayOfIds) => results.concat(arrayOfIds))
      })

      // .then((relatedResults) => {
      //   const relatedArtists = {}
      //   // Iterate Each artist related results
      //   relatedResults.forEach((result) =>  {
      //     // Iterate artists for each related
      //     result.artists.forEach((artist) => {
      //       // console.log('each artist in related', artist)
      //       relatedArtists[artist.id] = ++relatedArtists[artist.id] || 1;
      //     })
      //   })
      //   console.log('donePromises', relatedArtists)
      //   return relatedArtists
      // })
      // .then((relatedArtists) => { // Sort
      //   const sortable = []
      //   for (const artist in relatedArtists) {
      //     sortable.push([artist, relatedArtists[artist]])
      //   }
      //   // console.log(sortable)
      //   sortable.sort(function(a, b) {
      //     console.log(a, b)
      //     return a[1] < b[1]}
      //   )
      //   return sortable
      // })
      .done((data) => {
        console.log('finished', data)
      })
    return promises
  }

  discoverArtistsSuccess(data) {
    // console.log('mono', data)
    this.setState({ errorMessage: null, relatedArtists: data })
  }

  discoverArtistsFailed(error) {
    this.setState({ errorMessage: error })
  }

}

export default alt.createStore(SpotifyStore);
