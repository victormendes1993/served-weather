import axios from 'axios'

const geocode = (address, callback) => {

    const formatedAddress = address.trim().replace(/\s+/g, '_');
    const url = `https://api.weatherstack.com/current?access_key=8e1f60213ced5f191cbe315abd3af4cd&query=${encodeURIComponent(formatedAddress)}`

    axios.get(url)
        .then(response => {

            const { data } = response

            if (data.error) {
                return callback(data.error.info, undefined)
            }

            const { lat, lon } = data.location
            const { query: location } = data.request

            callback(undefined, { lat, lon, location })

        }).catch(error => {
            callback(error.message, undefined)
        })
}

export default geocode