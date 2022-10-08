const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//  define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//  setting up view engine and views (& partials) location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


//  setting up static directory to serve
app.use(express.static(publicDirPath))



app.get('',(req, res) => {

    res.render('index')

})


app.get('/about', (req, res) => {

    res.render('about')

})


app.get('/help', (req, res) => {

    res.render('help')

})


app.get('/weather', (req, res) => {

    if(!req.query.address){

        return res.send({
            error: "Address must be provided for a forecast."
        })

    }


    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error)
            return res.send({error})
        
        forecast(latitude, longitude, (error, forecastData)=> {
            if(error)
                return res.send({error})
            
            res.send({ forecast: forecastData, location})
        })

    })

})



app.get('/help/*', (req, res) => {

    res.render('error',{
        message: 'Help article not found!!'
    })

})

    
app.get('*', (req, res) => {

    res.render('error',{
        message: 'Page not found!!'
    })

})


app.listen(3000 , () => {
    console.log('server listening on port 3000...')
})

