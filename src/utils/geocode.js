const request = require('request')

const POSITIONSTACK_API_ACCESS_KEY = `bca2033d510e8a8c098ce597fb5a0e48`
const POSITIONSTACK_API_URL = `http://api.positionstack.com/v1/forward`


function geocode(address,cb){

    request(
        {
            url: POSITIONSTACK_API_URL,
            json: true,
            qs: {
                access_key: POSITIONSTACK_API_ACCESS_KEY,
                query: address,
                limit: 1
            }
        } ,
        (error, {body}={}) => {

            if(error)
                cb(`error connecting to geocoding service.`)
            else if(body.error)
                cb(`geocoding service responded with error.`)
                else if(body.data.length === 0)
                cb(`no data for the provided address.`)
            else
                cb(undefined, {
                        latitude:   body.data[0].latitude,
                        longitude:  body.data[0].longitude,
                        location:   body.data[0].label
                })
        }
    )


}


module.exports = geocode