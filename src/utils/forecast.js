const request = require('request')

const WEATHERSTACK_API_ACCESS_KEY = `d7ef2e3c86c71144a3b8a0b820d32792`
const WEATHERSTACK_API_URL = `http://api.weatherstack.com/current`


function forecast(lat,long,cb){

    request(
        {
            url: WEATHERSTACK_API_URL,
            json: true,
            qs: {
                access_key: WEATHERSTACK_API_ACCESS_KEY,
                query: `${lat},${long}`,
                units: 'm'
            }
        } ,
        (error, {body}={}) => {
            if(error)
                cb(`error connecting to weather service.`)
            else if(body.error)
                cb(`weather service responded with error.`)
            else
                cb(undefined, `${body.current.weather_descriptions[0]}. It's ${body.current.temperature}\u{2103}  outside, but feels like ${body.current.feelslike}. The humidity is ${body.current.humidity}%.`)
        }
    )

}

module.exports = forecast