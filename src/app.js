//Server-Side JavaScript File

import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

const app = express()
const port = process.env.PORT || 3000

// Defines paths for Express config
const publicPath = path.join(fileURLToPath(import.meta.url), '../../public')
const viewsPath = path.join(fileURLToPath(import.meta.url), '../../templates/views')
const partialsPath = path.join(fileURLToPath(import.meta.url), '../../templates/partials')

// Handlebars Engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Serve static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Victor Mendes'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Victor Mendes'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Victor Mendes'
    })
})

app.get('/weather', (req, res) => {

    const { address } = req.query

    if (!address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(address, (error, { lat: latitude, lon: longitude, location } = {}) => {

        if (error) {
            return res.send({
                error: `Geocoding failed: ${error}`
            });
        }

        forecast(latitude, longitude, (error, forecast) => {

            if (error) {
                return res.send({
                    error: `Forecasting failed: ${error}`
                })
            }

            res.send({
                address,
                latitude,
                longitude,
                location,
                forecast,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        code: '404',
        description: 'Help article not found',
        name: 'Victor Mendes'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        code: '404',
        description: 'Page not found',
        name: 'Victor Mendes'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})