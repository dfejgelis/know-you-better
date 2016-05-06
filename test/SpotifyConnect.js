import SpotifyConnect from '../src/lib/SpotifyConnect'
import { assert } from 'chai'


SpotifyConnect.setAccessData({
  access_token: 'BQC71rIpzhXg6hvf-24YRukDFa34TgtuwQvMTPWTrHRgABCnIAmqh-NYQgtK3SM111fwmmM6XdHM-WNT5NtOneUnFnK0nN9aHDqGnFLd2AyVz3MddW2m_fFnEkIRubQBKE2OW7fXngjPGxWGBwVksXq6gt-0btQqyg8EXpE1rfF9f4iI5i7bWdYSAqcK93kzOLCJb8Ji6LliviMtJqAt8C6WIm1bqJpC8oyR5toKZ9Rh_7u1r4zCL3_qIv9XQOD7dU23-RKfwPJLrvBKBMmOfzRLZ10mWDnHvz7LmaeaqPhJJVCgX2PksOgE',
})

describe('SpotifyConnect', () => {
  describe('fetchCurrentUser', () => {
    it('should fetch current user infomration', () => {
      const promise = SpotifyConnect.fetchCurrentUser()
      promise.done((me) => {
        console.log(me)
        assert.equal(me)
      })
    })
  })
})
