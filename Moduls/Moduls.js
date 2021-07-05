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
    
}
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
        result.save()
        .then(()=>{
            
            News.find({},(err,data)=>{
                res.send(data)
            })
        
        })
           
        
    })

   
}