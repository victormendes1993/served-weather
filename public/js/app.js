//Client-Side JavaScript File

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const location = document.querySelector('input').value
    getWeather(location)
})

function getWeather(query) {


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = query.trim().replace(/\s+/g, '_');
    const url = `http://localhost:3000/weather?address=${encodeURIComponent(location)}`

    fetch(url).then(response => {
        return response.json()
    }).then((data) => {

        if (data.error) {
            return messageOne.textContent = data.error
        }

        messageOne.textContent = data.location


        if (data.forecast && data.forecast.length > 0) {
            messageTwo.textContent = data.forecast
        } else {
            messageTwo.textContent = 'No forecast data available'
        }

    }).catch((error) => {
        messageOne.textContent = error
        messageTwo.textContent = ''
    })
}