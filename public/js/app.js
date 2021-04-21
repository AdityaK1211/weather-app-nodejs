console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const country = document.querySelector('#location')
const temperature = document.querySelector('#temp')
const temperatureMinMax = document.querySelector('#temp_min_max')
let weatherCondition = document.getElementById("weatherCondition");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } 
            else {
                let forecastArray = data.forecast
                let y = data.location.split(', ')
                let address = `${y[0]},${forecastArray[0]}`;
                const tempStatus = forecastArray[4];

                messageOne.textContent = data.location
                messageTwo.textContent = 'It\'s a ' + tempStatus + ' Day!'
                country.textContent = address
                temperature.textContent = forecastArray[1] + '°C'
                temperatureMinMax.textContent = 'Min ' + forecastArray[2] + '°C | Max ' + forecastArray[3] + '°C'

                
                console.log(tempStatus)
                //condition to check sunny or cloudy
                if (tempStatus == "Sunny" || tempStatus == "Clear") {
                    weatherCondition.innerHTML =
                    "<i class='fas fa-sun' style='color: #FFBF00;'></i>";
                } 
                else if (tempStatus == "Clouds") {
                    weatherCondition.innerHTML =
                    "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
                } 
                else if (tempStatus == "Rainy") {
                    weatherCondition.innerHTML =
                    "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
                } 
                else {
                    weatherCondition.innerHTML =
                    "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
                }
            }
        })
    })
})