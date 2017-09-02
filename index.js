const express =require('express');
const http =require('http');
const bodyParser =require('body-parser');
const morgan =require('morgan');
const router=require('./router');
const app=express();
const mongoose=require('mongoose');

//DB Setup
mongoose.connect('mongodb://localhost/auth',{useMongoClient:true});//create auth database on localhost
//App setup
app.use(morgan('combined'));//register morgan as middleware
//morgan is logging framework
app.use(bodyParser.json({type: '*/*'}));//register bodyParser as middleware
//bodyParser is used to parse incoming request as json
//server setup
router(app);

const port=process.env.PORT||3090;
const server=http.createServer(app);
 server.listen(port);
 console.log('Sever Listening on :',port);
