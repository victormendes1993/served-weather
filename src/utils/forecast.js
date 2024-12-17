import axios from 'axios'

const forecast = (latitude, longetude, callback) => {

    const url = `https://api.weatherstack.com/current?access_key=8e1f60213ced5f191cbe315abd3af4cd&query=${latitude},${longetude}`

    axios.get(url)
        .then(response => {

            const { data } = response

            if (data.error) {
                return callback(data.error.info, undefined)
            }

            const { weather_descriptions: forecast } = data.current
            callback(undefined, forecast)

        }).catch(error => {
            callback(error.message, undefined)
        });

}

export default forecast