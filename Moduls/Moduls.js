
const axios = require('axios');
const{
    NewsSchema,
    News,
}=require('../Controller/Contraller')
module.exports={
    home,
    laterAdd,
    getNews,
    removeNews,
    updateData,
    getAllData,
}
function home(req,res){
    res.send('hiiiii')
}

function getAllData(req,res){
    
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2021-07-05&sortBy=publishedAt&apiKey=6d921101d84c4a80a66c2559721f7783`;
    axios.get(url).then(result=>{
        res.send(result.data)
    })


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
        result.save()
        .then(()=>{
            
            News.find({},(err,data)=>{
                res.send(data)
            })
        
        })
           
        
    })

   
}