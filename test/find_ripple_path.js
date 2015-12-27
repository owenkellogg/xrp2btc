import {findRipplePath} from '../src'
import assert from 'assert'

describe('#findRipplePath', function() {

    it('should return a valid path', function(done) {
        var source = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
        var destination = 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q'
        var amount = 1
        var issuer = 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q'

        findRipplePath(source, destination, amount, issuer).then(function(path) {
            console.log('PATH', path)
            assert.strictEqual(path.source_amount.currency, 'XRP') 
            done()
        })
        .catch(function(error) {
            console.log('ERROR', error)
        })
    })
})

