import {lookupFederationUrl} from '../src'
import assert from 'assert'

describe('lookupFederationUrl', function() {

    it('should return the btc2ripple federation url', function(done) {

        const expectedFederationUrl = 'https://btc2ripple.com/api/v1/bridge'

        lookupFederationUrl('btc2ripple.com').then(function(url) {
            assert.strictEqual(url, expectedFederationUrl)
            done()
        })
        .catch(function(error) {
            console.log('ERROR', error)
            assert.strictEqual(url, expectedFederationUrl)
            done()
        })
    })
})
