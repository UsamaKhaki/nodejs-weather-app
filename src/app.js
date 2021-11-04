const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

// Initiating express
const app = express();
const port = process.env.PORT || 3000;

// Changing Directories
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather APP",
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Title",
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Title",
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "Please provide any address",
        })
    }
    geocode(address, function (error, { latitude, longitude, location } = {}) {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, function (error, data) {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: data,
                location: location,
                address: req.query.address,
            });
        })

    })
})

app.get('/products', (req, res) => {
    // req.query for getting queries or request parameters;
    const {search} = req.query;
    res.send({
        products: [],
    })
})

// For Error Message
app.get('*', (req, res) => {
    res.render('404', {
        title: "Page Not found!!",
        para: "Please try again after sometime or contact admin."
    });
})

app.listen(port, () => {
    console.log('SERVER IS UP ON PORT ' + port + '.');
});