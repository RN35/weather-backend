"use strict"

// var express = require('express')
// var app = express()

const express = require("express");
const bodyParser = require("body-parser");
// const router = express.Router();
const app = express();

app.listen(3000)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log('Node. js Express server is running on port 3000... ')

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/v1/weather', get_weather)

function get_weather(request, response) {
    response.json({ "coord": { "lon": -123.262, "lat": 44.5646 }, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02n" }], "base": "stations", "main": { "temp": 58, "feels_like": 49.98, "temp_min": 48.09, "temp_max": 55.45, "pressure": 1023, "humidity": 78 }, "visibility": 10000, "wind": { "speed": 0, "deg": 0 }, "clouds": { "all": 20 }, "dt": 1641958461, "sys": { "type": 2, "id": 2040223, "country": "US", "sunrise": 1641916079, "sunset": 1641948820 }, "timezone": -28800, "id": 5720727, "name": "Corvallis", "cod": 200 })
}

app.get('/v1/hello', get_greeting)

function get_greeting(request, response) {
    response.json({
        "message": "Good morning"
    })
}

app.post('/v1/auth', login_user)

function login_user(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    // response.send(request.body);
    console.log('body is ', request.body);
    response.json({
        "token": "a_very_secret_token_for_" + username
    })
}