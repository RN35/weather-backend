"use strict"

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
app.listen(3000)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log('Node. js Express server is running on port 3000... ')

app.use(function (request, response, next) {
    // Website you wish to allow to connect
    const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io'];
    const origin = request.headers.origin;
    if (allowedOrigins.includes(origin)) {
        response.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // response.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/v1/weather', get_weather)

function get_weather(request, response) {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return response.sendStatus(401)

    if (token == jwt_token) {
        response.json({ "coord": { "lon": -123.262, "lat": 44.5646 }, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02n" }], "base": "stations", "main": { "temp": 58, "feels_like": 49.98, "temp_min": 48.09, "temp_max": 55.45, "pressure": 1023, "humidity": 78 }, "visibility": 10000, "wind": { "speed": 0, "deg": 0 }, "clouds": { "all": 20 }, "dt": 1641958461, "sys": { "type": 2, "id": 2040223, "country": "US", "sunrise": 1641916079, "sunset": 1641948820 }, "timezone": -28800, "id": 5720727, "name": "Corvallis", "cod": 200 })
    }
    else {
        return response.sendStatus(403)
    }

}

app.get('/v1/hello', get_greeting)

function get_greeting(request, response) {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return response.sendStatus(401)

    if (token == jwt_token) {
        response.json({
            "message": "Good morning"
        })
    }
    else {
        return response.sendStatus(403)
    }


}

app.post('/v1/auth', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    // Authenticate User
    // Create jwt token 
    response.json({
        "access-token": jwt_token,
        "expires": "2012-04-23T18:25:43.511Z"
    })


})


