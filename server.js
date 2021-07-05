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

const NewsSchema = new mongoose.Schema({
    title: String,
    content: String,
    img: String
    
  });
const News = mongoose.model('News', NewsSchema);

// Routs 

server.get('/',home)
server.post('/addtolater',laterAdd)
server.get('/getnews',getNews)
server.delete('/delete',removeNews)
server.put('/updatenews',updateData)

// http://localhost:3002/addtolater
// http://localhost:3002/getnews
// http://localhost:3002/delete
// http://localhost:3002/updatenews
// Functions 

function home(req,res){
    res.send('hiiiii')
}

function laterAdd(req,res){
let {title,content,img}=req.body
let artical=new News({
    title: title,
    content: content,
    img: img,
    
})
artical.save();
}


function getNews(req,res){

    News.find({},(err,result)=>{
        res.send(result)
     })

}
function removeNews(req,res){

    let id=req.query.id;
    News.findByIdAndDelete({_id:id},(err,result)=>{
    })
    News.find({},(err,result)=>{
        res.send(result)
     })
}

function updateData(req,res){
    let {title,content,id}=req.body;

    News.findOne({_id:id},(err,result)=>{
        result.title=title;
        result.content=content;
        result.save();
    })

    .then(
        News.find({},(err,data)=>{
            res.send(data)
        })
    
    )
}