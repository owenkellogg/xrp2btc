import http from 'superagent'
import _ from 'lodash'

export function lookupFederationUrl(domain) {

    return new Promise(function(resolve, reject) {
        http.get(`https://${domain}/ripple.txt`) 
            .end(function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    var federation_url_line_number
                    var lines = response.text.split("\n")

                    for (var i=0; i<lines.length;i++) {
                        if (lines[i].match('federation_url')) {
                            federation_url_line_number = i
                        }
                    }

                    resolve(lines[federation_url_line_number+1]) 
                }
            })
    })
}

export function lookupFederationAddress(destination, federationUrl, domain) {

    return new Promise(function(resolve, reject) {
        http.get(`${federationUrl}?domain=${domain}&destination=${destination}&type=federation`) 
            .end(function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    try {
                        var quoteUrl = response.body.federation_json.quote_url
                        if (quoteUrl) {
                            resolve(quoteUrl)
                        } else {
                            reject(new Error('federation quote not possible for destination'))
                        }
                    } catch(e) {
                        reject(e)
                    }
                }
            })
    })
}

export function getFederationQuote(quoteUrl, destination, amount, domain) {

    return new Promise(function(resolve, reject) {
        http.get(`${quoteUrl}?type=quote&domain=${domain}&destination=${destination}&amount=${amount}`)  
            .end(function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    var quote = response.body.quote
                    resolve({
                        amount: parseFloat(quote.amount.value),
                        address: quote.destination_address,
                        invoiceId: quote.invoice_id,
                        tag: quote.destination_tag,
                        issuer: quote.send[0].issuer
                    })
                }
            })
    })
}

export function findRipplePath(source, destination, amount, issuer) {

    return new Promise(function(resolve, reject) {
        var url =`http://127.0.0.1:5990/v1/accounts/${source}/payments/paths/${destination}/${amount}+BTC+${issuer}`
        console.log('URL', url)
        http.get(url)
            .end(function(error, response) {
                if (error) {
                    reject(error)
                } else {
                    var quote = _.find(response.body.payments, function(payment) {
                        return payment.source_amount.currency === 'XRP'
                    })
                    if (quote) {
                        resolve(quote)
                    } else {
                        reject(new Error('no path found'))
                    }
                }
            })
    })
}


