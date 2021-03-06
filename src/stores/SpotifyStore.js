import alt from '../alt'

import SpotifyActions from '../actions/SpotifyActions'
import SpotifyConnect from '../lib/SpotifyConnect'
import MockedArtists from '../../test/mocks/topArtists'
import MockedRelatedArtists from '../../test/mocks/relatedArtists'
import MockedTopTracks from '../../test/mocks/topTracks'
import MockedPlaylist from '../../test/mocks/playlist'

// TODO: Remove
// const accessToken = 'BQBohXI2YpdQ0Gpsq3lNYutVgzCo17Ukb880gXIR2gBRdZ4x_-KxjzvH9yX06oXGe4L1REeg3IOIrDbtcrrKFH9SZOBm26qJdq8VBwHULtZZvFArg2UTGQ-trWop9jZryaYjCjWvh7On8Fy36ZSNcQnv4NiLr1hRmwCv_6waiBQszvKZcqLRJAoZbUiTg75QFaHRTuHwPQa42AXCAiB7fmGw3yRDlaVQ9U_2XuoW5LtNQ2ko5e9gSUEvuI-3xwALovDuE9rfeb4yLbxYJh7Enpgv2H8HqeUeiJosSHqeEiWPd0UPMb7QttCc'
// SpotifyConnect.setAccessData({access_token: accessToken})

class SpotifyStore {
  constructor() {
    this.me = {}
    this.artists = []
    this.relatedArtists = []
    this.topTracks = []
    this.playlist = null

    // TODO :: Remove
    // this.artists = MockedArtists
    // this.relatedArtists = MockedRelatedArtists
    // this.topTracks = MockedTopTracks
    // this.playlist = MockedPlaylist

    this.errorMessage = null
    this.access_token

    this.bindActions(SpotifyActions)
  }
  setCredentials(access_token) {
    this.access_token = access_token
    SpotifyConnect.fetchCurrentUser()
      .catch((error) => this.errorMessage = error)
      .done((data) => {
        this.me = data
        return data
      })
  }

  fetchTopArtists() {
    this.errorMessage = null
    SpotifyConnect.fetchTopArtists()
      .catch((error) => this.fetchTopArtistsFailed(error))
      .done((data) => this.fetchTopArtistsSuccess(data))
  }

  fetchTopArtistsSuccess(data) {
    // console.log('finishedTop', JSON.stringify(data.items))
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
      // Fetch TOP 5 artists information
      .then((relatedArtists) => {
        const promises = []
        relatedArtists.forEach((relatedArtist) => promises.push(SpotifyConnect.fetchArtistInformation(relatedArtist[0])))
        Promise.all(promises)
          .then((data) => {
            this.discoverArtistsSuccess(data)
          })
      })
    return promises
  }

  discoverArtistsSuccess(data) {
    // console.log('discoverArtistsSuccess', JSON.stringify(data))
    this.setState({ errorMessage: null, relatedArtists: data })
  }

  discoverArtistsFailed(error) {
    this.setState({ errorMessage: error })
  }

  fetchTopTracks() {
    const promises = []
    this.relatedArtists.forEach((relatedArtist) => {
      promises.push(SpotifyConnect.fetchArtistTopTracks(relatedArtist.id, this.me.country))
    })
    Promise.all(promises)
      //
      .then((data) => {
        const topTracks = []
        data.map((artistTopTracks) => {
          artistTopTracks.tracks.slice(1, 3).map((topTrack) => topTracks.push(topTrack))
        })
        return topTracks
      })
      .then((data) => {
        this.fetchTopTracksSuccess(data)
      })
  }

  fetchTopTracksSuccess(data) {
    // console.log('tomock', JSON.stringify(data))
    this.setState({ errorMessage: null, topTracks: data })
  }

  fetchTopTracksFailed(error) {
    this.setState({ errorMessage: error })
  }

  createPlaylist(options) {
    const name = options[0]
    const tracks = options[1]

    SpotifyConnect.createPlaylist(name, this.me.id)
      .catch((error) => this.createPlaylistFailed(error))
      .then((playlist) => {
        this.playlist = playlist
        this._addTracksToPlaylist(tracks)
      })
  }

  _addTracksToPlaylist(tracks) {
    const tracksURIs = tracks.map((track) => track.uri)

    SpotifyConnect.addTracksToPlaylist(this.me.id, this.playlist.id, tracksURIs)
      .catch((error) => this.errorMessage = error)
      .then((res) => {
        console.log('Playlist Created', res)
        this.createPlaylistSuccess(tracks)
      })
  }

  createPlaylistSuccess(data) {
    const playlist = this.playlist
    playlist.tracks.items = data
    this.setState({ errorMessage: null, playlist: playlist })
  }

  createPlaylistFailed(error) {
    this.setState({ errorMessage: error })
  }

}

export default alt.createStore(SpotifyStore)
