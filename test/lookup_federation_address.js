import {lookupFederationAddress} from '../src'
import assert from 'assert'

describe('#lookupFederationAddress', () => {

    it('#lookupFederationAddress', function(done) {
        const federationUrl = 'https://btc2ripple.com/api/v1/bridge'
        const expectedUrl =  'https://snapswap.us/api/v1/bridge'
        const destination = '1ckXcFThTXAYjSZBjePK6oUxn1maunFmh'
        const domain = 'btc2ripple.com'

        lookupFederationAddress(destination, federationUrl, domain).then(function(quoteUrl) {
            assert.strictEqual(quoteUrl, expectedUrl)
            done()
        })        
        .catch(function(error) {
            console.log('ERROR', error)
            assert(false)
            done()
        })
    })
})

