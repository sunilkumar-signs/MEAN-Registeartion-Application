const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;

//database
require('./db/conn')
app.use(express.json()); //Post data is undefined with the use of the json and below DB 

// const User = require('./model/userSchema')

// Routs
app.use(require('./router/auth'));


// app.get('/about', middleware, (req, res) => {
//     res.send('About page')
// });

// app.get('/contact', (req, res) => {
//     res.send('Conatct us')
// });

// app.get('/signin', (req, res) => {
//     res.send('sign in')
// });

// app.get('/signup', (req, res) => {
//     res.send('sign up')
// });

app.listen(PORT, () => {
    console.log('server is listening at the port no', PORT);
})
