import alt from '../alt'

import SpotifyActions from '../actions/SpotifyActions'
// import SpotifySource from '../sources/SpotifySource'
import SpotifyConnect from '../lib/SpotifyConnect'

// TODO: Remove
// const accessToken = 'BQBohXI2YpdQ0Gpsq3lNYutVgzCo17Ukb880gXIR2gBRdZ4x_-KxjzvH9yX06oXGe4L1REeg3IOIrDbtcrrKFH9SZOBm26qJdq8VBwHULtZZvFArg2UTGQ-trWop9jZryaYjCjWvh7On8Fy36ZSNcQnv4NiLr1hRmwCv_6waiBQszvKZcqLRJAoZbUiTg75QFaHRTuHwPQa42AXCAiB7fmGw3yRDlaVQ9U_2XuoW5LtNQ2ko5e9gSUEvuI-3xwALovDuE9rfeb4yLbxYJh7Enpgv2H8HqeUeiJosSHqeEiWPd0UPMb7QttCc'
// SpotifyConnect.setAccessData({access_token: accessToken})

class SpotifyStore {
  constructor() {
    this.artists, this.relatedArtists = [], []
    this.errorMessage = null

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
    const promises = SpotifyConnect.discovertArtists(
      this.artists.map((artist) => artist.id)
    )
    Promise.all(promises)
      .catch((error) => this.discoverArtistsFailed(error))
      // We have an array of 'artists' with information
      .then((relatedResults) => {
        const a = relatedResults.map((relatedResult) =>
          relatedResult.artists.map((artist) => artist.id)
        )
        return a
      })
      // Now we have an array of arrays of ids
      .then((relatedResultsIds) => {
        let artistsIds = []
        relatedResultsIds.forEach((arrayOfIds) =>  {
          artistsIds = artistsIds.concat(arrayOfIds)
        })
        return artistsIds
      })
      // Now we have an arrays of ids
      .then((artistsIds) => {
        const relatedArtists = {}
        // Iterate artists for each related
        artistsIds.forEach((artistId) => {
          // console.log('each artist in related', artist)
          relatedArtists[artistId] = ++relatedArtists[artistId] || 1
        })
        // console.log('donePromises', relatedArtists)
        return relatedArtists
      })
      // Delete relatedArtists that are my top
      .then((relatedArtists) => {
        const myArtistsIds = this.artists.map((artist) => artist.id)
        myArtistsIds.forEach((id) => {
          if (relatedArtists.hasOwnProperty(id)) {
            delete relatedArtists[id]
          }
        })
        return relatedArtists
      })
      // Sort (most related matches first)
      .then((relatedArtistsWithCount) => {
        let sortable = []
        for (const artist in relatedArtistsWithCount) {
          sortable.push([artist, relatedArtistsWithCount[artist]])
        }
        return sortable.sort((prev, next) => next[1] - prev[1])
      })
      // Get TOP 5
      .then((relatedArtists) => relatedArtists.slice(0, 6))
      .done((data) => {
        this.discoverArtistsSuccess(data)
        console.log('finished', data)
      })
    return promises
  }

  discoverArtistsSuccess(artistsIds) {
    // console.log('mono', data)
    this.setState({ errorMessage: null, relatedArtists: artistsIds })
  }

  discoverArtistsFailed(error) {
    this.setState({ errorMessage: error })
  }

}

export default alt.createStore(SpotifyStore)
