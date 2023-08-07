const dotenv = require("dotenv")
const mongoose = require('mongoose')
const express = require('express');
const app = express();


const User = require("./model/userSchema");
require('./db/conn');

app.use(express.json());

// we link the router files to make our route easy 
app.use(require('./router/auth'));


app.get('/', (req, res)=>{
    res.send('Hello world from the app *********** server');
});
app.get('/about', (req, res)=>{
    res.send('About Hello world from the server');
});
app.get('/contect', (req, res)=>{
    res.send('contect Hello world from the server');
});
app.get('/login', (req, res)=>{
    res.send('login Hello world from the server');
});
app.get('/signup', (req, res)=>{
    res.send(' signup Hello world from the server');
});

 
app.listen(3000,()=>{
    console.log("server is runng at port no 3000 ")
});