import { Buffer } from 'buffer'

const urls = {
  authorize: 'https://accounts.spotify.com/authorize',
  token: 'https://accounts.spotify.com/api/token',
  currentUser: 'https://api.spotify.com/v1/me',
  artistsTop: 'https://api.spotify.com/v1/me/top/artists',
  artist: 'https://api.spotify.com/v1/artists/{id}',
  artistsRelated: 'https://api.spotify.com/v1/artists/{id}/related-artists',
  artistsTopTracks: 'https://api.spotify.com/v1/artists/{id}/top-tracks',
  playlist: 'https://api.spotify.com/v1/users/{user_id}/playlists',
  playlistAddTracks: 'https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks',
}


class SpotifyConnect {
  setRedirectURI(redirectURI) {
    this.redirectURI = redirectURI
  }
  setCredentials(clientId, clientSecret) {
    this.clientId = clientId
    this.clientSecret = clientSecret
  }
  setAccessData(options) {
    this.token = options
  }

  getAccessToken(authToken) {
    const headers = {
      Authorization: 'Basic ' + new Buffer(this.clientId + ':' + this.clientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    const params = {
      grant_type : 'authorization_code',
      redirect_uri: this.redirectURI,
      code: authToken,
    }
    const str = []
    for (let val in params) {
      str.push(encodeURIComponent(val) + '=' + encodeURIComponent(params[val]))
    }
    const body = str.join('&')

    const fetchOptions = {
        method: 'POST',
        headers: headers,
        body: body,
    }

    return this._fetch(urls.token, fetchOptions)
      .then((data) => {
        this.setAccessData(data)
        // console.debug('accessToken', data)
        return data
      })
  }

  _getAccessTokenHeader() {
    return {
      Authorization: `Bearer ${this.token.access_token}`,
    }
  }

  _fetch(url, options) {
    // console.debug('Fetching url', url)
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Couldn't fetch url: ${url}`, response)
        }
        return response.text()
      })
      .then((responseText) => JSON.parse(responseText))
  }

  fetchTopArtists() {
    return this._fetch(urls.artistsTop, {
      method: 'GET',
      headers: this._getAccessTokenHeader(),
    })
  }

  discovertArtists(artistsIds) {
    const promises = []
    for (const artistId of artistsIds) {
      const url = urls.artistsRelated.replace('{id}', artistId)
      const promise = this._fetch(url, {
        method: 'GET',
        headers: this._getAccessTokenHeader(),
      })
      promises.push(promise)
    }
    return promises
  }

  fetchArtistInformation(artistsId) {
    const url = urls.artist.replace('{id}', artistsId)
    return this._fetch(url, {
      method: 'GET',
      headers: this._getAccessTokenHeader(),
    })
  }

  fetchArtistTopTracks(artistId, country) {
    const url = urls.artistsTopTracks.replace('{id}', artistId) + `?country=${country}`
    return this._fetch(url, {
      method: 'GET',
      headers: this._getAccessTokenHeader(),
    })
  }

  fetchCurrentUser() {
    return this._fetch(urls.currentUser, {
      method: 'GET',
      headers: this._getAccessTokenHeader(),
    })
  }

  createPlaylist(name, userId) {
    const headers = this._getAccessTokenHeader()
    headers['Content-Type'] = 'application/json'

    const url = urls.playlist.replace('{user_id}', userId)
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ name: name, public: false }),
    }

    // console.log(url, options)
    return this._fetch(url, options)
  }

  addTracksToPlaylist(userId, playlistId, trackURIs) {
    const headers = this._getAccessTokenHeader()
    headers['Content-Type'] = 'application/json'

    const url = urls.playlistAddTracks.replace('{user_id}', userId).replace('{playlist_id}', playlistId)
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ uris: trackURIs }),
    }

    console.log(url, options)
    return this._fetch(url, options)
  }

  getAuthURL() {
    const scope = "user-top-read user-read-private playlist-modify-private"
    const params = {
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectURI,
      scope: scope,
      state: 'authenticate',
    }
    const qs = []
    for (let val in params) {
      qs.push(val + '=' + encodeURIComponent(params[val]))
    }
    return `${urls.authorize}?${qs.join('&')}`
  }
}

export default new SpotifyConnect()
