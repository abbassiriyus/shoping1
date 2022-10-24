const express = require('express');
const upload = require('express-fileupload');
const app = express();
const fs = require('fs')
const cors = require('cors');
const uuid = require('uuid');
app.use(cors())

app.use(upload())
app.use(express.static('./data'))
// category
app.get('/category', (req, res) => {
    var data = JSON.parse(fs.readFileSync('./data/data.json', "utf-8"))
    console.log(data);
    res.status(200).send(data)
})
app.get('/category/:id', (req, res) => {
    var data = JSON.parse(fs.readFileSync('./data/data.json', "utf-8"))
  console.log(data);
  
    var b=data.filter(word=>word.id==req.params.id)
    if(b.length==0){
   res.status(404).send("No Category this id")}
    else{
         res.status(200).send(b)
    }
})
app.delete('/category/:id', (req, res) => {
   
    var data = JSON.parse(fs.readFileSync('./data/data.json', "utf-8"))
  console.log(data);
    var b=data.filter(word=>word.id!==req.params.id);
    var d=data.filter(word=>word.id!==req.params.id);
    console.log(req.params.id);
console.log(b);
if(d.length==0){
    res.status(404).send('NO category this id')
}else{
    res.status(200).send("Deleted",b);
    var sendFile = JSON.stringify(b)
    fs.writeFileSync('./data/data.json', sendFile, 'utf8', () => {
        console.log("ishladi");
    })

}
})
app.post('/category', (req, res) => {
    var imagesUrl = req.files.image
    imagesUrl.mv(`${__dirname}/data/img/${req.files.image.name}`)
    var data = {
        "image": `/data/img/${req.files.image.name}`,
        "category": req.body.category,
        "id": uuid.v4()
    }
    var Json = eval(fs.readFileSync('./data/data.json', 'utf8'))
    console.log(fs.readFileSync('./data/data.json', 'utf8'));
    Json.push(data)

    console.log(Json);
    var sendFile = JSON.stringify(Json)
    fs.writeFileSync('./data/data.json', sendFile, 'utf8', () => {
        console.log("ishladi");
    })
})
app.put('/category/:id',(req,res)=>{
    console.log(req.params.id);
    var data = JSON.parse(fs.readFileSync('./data/data.json', "utf-8"))
    console.log(data);
    var imagesUrl = req.files.image
    imagesUrl.mv(`${__dirname}/data/img/${req.files.image.name}`)
    var b=data.filter(word=>word.id!==req.params.id);
    if(b.length==0){res.status(404).send("No Category this id")}else{
data.forEach(item => {
    if(item.id==req.params.id){
        item.image= req.files.image ? `/data/img/${req.files.image.name}` : item.image;
        item.category= req.body.category ? req.body.category : item.category;
    }
    
});
console.log(data);
var sendFile = JSON.stringify(data)
fs.writeFileSync('./data/data.json', sendFile, 'utf8', () => {
    console.log("ishladi");
})}
})




// subcategory
app.get('/subcategory', (req, res) => {
    var data = JSON.parse(fs.readFileSync('./data/subdata.json', "utf-8"))
    console.log(data);
    res.status(200).send(data)
})
app.get('/subcategory/:id', (req, res) => {
    var data = JSON.parse(fs.readFileSync('./data/subdata.json', "utf-8"))
  console.log(data);
  
    var b=data.filter(word=>word.id==req.params.id)
    if(b.length==0){
   res.status(404).send("No Category this id")}
    else{
         res.status(200).send(b)
    }
})
app.delete('/subcategory/:id', (req, res) => {
   
    var data = JSON.parse(fs.readFileSync('./data/subdata.json', "utf-8"))
  console.log(data);
    var b=data.filter(word=>word.id!==req.params.id);
    var d=data.filter(word=>word.id!==req.params.id);
    console.log(req.params.id);
console.log(b);
if(d.length==0){
    res.status(404).send('NO subcategory this id')
}else{
    res.status(200).send("Deleted",b);
    var sendFile = JSON.stringify(b)
    fs.writeFileSync('./data/subdata.json', sendFile, 'utf8', () => {
        console.log("ishladi");
    })

}
})
app.post('/subcategory', (req, res) => {
    var imagesUrl = req.files.image
    imagesUrl.mv(`${__dirname}/data/img/${req.files.image.name}`)
    var data = {
        "image": `/data/img/${req.files.image.name}`,
        "subcategory": req.body.subcategory,
        "id": uuid.v4()
    }
    var Json = eval(fs.readFileSync('./data/subdata.json', 'utf8'))
    console.log(fs.readFileSync('./data/subdata.json', 'utf8'));
    Json.push(data)

    console.log(Json);
    var sendFile = JSON.stringify(Json)
    fs.writeFileSync('./data/subdata.json', sendFile, 'utf8', () => {
        console.log("ishladi");
    })
})
app.put('/subcategory/:id',(req,res)=>{
    console.log(req.params.id);
    var data = JSON.parse(fs.readFileSync('./data/subdata.json', "utf-8"))
    console.log(data);
    var imagesUrl = req.files.image
    imagesUrl.mv(`${__dirname}/data/img/${req.files.image.name}`)
    var b=data.filter(word=>word.id!==req.params.id);
    if(b.length==0){res.status(404).send("No Category this id")}else{
data.forEach(item => {
    if(item.id==req.params.id){
        item.image= req.files.image ? `/data/img/${req.files.image.name}` : item.image;
        item.subcategory= req.body.subcategory ? req.body.subcategory : item.subcategory;
    }
    
});
console.log(data);
var sendFile = JSON.stringify(data)
fs.writeFileSync('./data/subdata.json', sendFile, 'utf8', () => {
    console.log("ishladi");
})}
})







app.listen(5000, () => {
    console.log("run server");
})