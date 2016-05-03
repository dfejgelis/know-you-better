import { Buffer } from 'buffer'

const urls = {
  authorize: 'https://accounts.spotify.com/authorize',
  token: 'https://accounts.spotify.com/api/token',
  artistsTop: 'https://api.spotify.com/v1/me/top/artists',
  artistsRelated: 'https://api.spotify.com/v1/artists/{id}/related-artists',
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
      'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
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
        console.debug('accessToken', data)
        return data
      })
  }

  _getAccessTokenHeader() {
    return {
      Authorization: `Bearer ${this.token.access_token}`,
    }
  }

  _fetch(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Couldn't fetch top artists`)
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

  getAuthURL(scope) {
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
