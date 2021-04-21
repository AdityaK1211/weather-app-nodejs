const request = require('request')
const API_KEY = process.env.OPENWEATHER_API_KEY
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + API_KEY
    
    request({ url, json: true }, (error, { body }) => {
        // console.log(body)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } 
        else if (body.error) {
            callback('Unable to find location', undefined)
        } 
        else {
            Number.prototype.round = function(places) {
              return +(Math.round(this + "e+" + places)  + "e-" + places);
            }
            
            let country = body.sys.country;
            let temp = parseFloat(body.main.temp) / 10;
            let temp_min = parseFloat(body.main.temp_min) / 10;
            let temp_max = parseFloat(body.main.feels_like) / 10;
            let temp_status = body.weather[0].main;
 
            let result = []
            result.push(country)
            result.push(temp.round(2))
            result.push(temp_min.round(2))
            result.push(temp_max.round(2))
            result.push(temp_status)
            callback(undefined, result)
        }
    })
}

module.exports = forecast