'use strict';

const express=require('express');
const server=express();
require('dotenv').config();
let cors = require('cors')
server.use(express.json());
server.use(cors());
 let PORT=process.env.PORT
 
server.listen(PORT,()=>{
    console.log(`listeb to Port ${PORT} `)

})
let MONGOS=process.env.MONGOS_URI
const mongoose = require('mongoose');
mongoose.connect(MONGOS, {useNewUrlParser: true, useUnifiedTopology: true});

// Routs 
const {
    home,
    laterAdd,
    getNews,
    removeNews,
    updateData,
    getAllData,
    
}=require('./Moduls/Moduls.js')

server.get('/',home)
server.get('/alldata',getAllData)
server.post('/addtolater',laterAdd)
server.get('/getnews',getNews)
server.delete('/delete',removeNews)
server.put('/updatenews',updateData)

// http://localhost:3002/addtolater
// http://localhost:3002/getnews
// http://localhost:3002/delete
// http://localhost:3002/updatenews
// Functions 
