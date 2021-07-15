const express = require('express')
const app = express()
const port = 3004
const route = require('./Route/index')
const cors = require('cors');
const mongoose = require('mongoose');
// Database Connectivity
const keys = require("./config/keys.js")
// mongoose.Promise = global.Promise;

mongoose.connect(keys.mongooes.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(console.log("connected to db"))
    .catch(err => console.log(err))

var corsOptions = {
    origin: "*",
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-reset-token', 'x-invite-token', 'x-api-key', 'x-www-form-urlencoded'],
    credentials: true
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(route)
app.listen(port)