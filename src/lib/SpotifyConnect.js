import { Buffer } from 'buffer'

const urls = {
  authorize: 'https://accounts.spotify.com/authorize',
  token: 'https://accounts.spotify.com/api/token',
  topArtists: 'https://api.spotify.com/v1/me/top/artists',
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

  getAccessToken(authToken, callback) {
    const headers = {
      Authorization: 'Basic ' + new Buffer(this.clientId + ':' + this.clientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    const params = {
      grant_type : 'authorization_code',
      redirect_uri: this.redirectURI,
      code: authToken,
    };
    const str = [];
    for (let val in params) {
      str.push(encodeURIComponent(val) + '=' + encodeURIComponent(params[val]));
    }
    const body = str.join('&');

    const fetchOptions = {
        method: 'POST',
        headers: headers,
        body: body,
    };

    fetch(urls.token, fetchOptions)
      .then((response) => response.text())
      .then((responseText) => {
        const responseData = JSON.parse(responseText)
        this.setAccessData(responseData)
        callback(responseData)
      })
      .catch((error) => {
        console.warn(error);
      })
  }

  _getAccessTokenHeader() {
    return {
      Authorization: `Bearer ${this.token.access_token}`,
    }
  }

  fetchTopArtists() {
    return fetch(urls.topArtists, {
      method: 'GET',
      headers: this._getAccessTokenHeader(),
    })
  }

  getAuthURL(scope) {
    const params = {
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectURI,
      scope: scope,
      state: 'authenticate',
    }
    const qs = [];
    for (let val in params) {
      qs.push(val + '=' + encodeURIComponent(params[val]));
    }
    return `${urls.authorize}?${qs.join('&')}`
  }
}

export default new SpotifyConnect()
