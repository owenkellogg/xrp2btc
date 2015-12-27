import {getFederationQuote} from '../src'
import assert from 'assert'

describe('#getFederationQuote', () => {

    it('should return an amount, issuer, destination, tag, and invoiceId', function(done) {

        const quoteUrl = 'https://snapswap.us/api/v1/bridge'
        const destination = '1ckXcFThTXAYjSZBjePK6oUxn1maunFmh'
        const amount = 1
        const domain = 'snapswap.us'

        const expectedAddress = 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q'

        getFederationQuote(quoteUrl, destination, amount, domain).then(function(quote) {
            console.log('QUOTE', quote)
            assert.strictEqual(quote.amount, amount)
            assert.strictEqual(quote.address, expectedAddress)
            assert(quote.invoiceId)
            assert(quote.tag > 0)
            assert.strictEqual(quote.issuer, 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q')
            done()
        })
        .catch(function(error) {
            console.log('error', error)
            assert(false)
            done()
        })
    })
})

