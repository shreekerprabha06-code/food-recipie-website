const express = require('express')
const router = express.Router()
const mongodb = require('mongodb').MongoClient

  module.exports = router.post('/',(req,res)=>{
    const  data = {
        "id":parseInt(req.body.id),
        "img":req.body.img,
        "name": req.body.name,
        "content": req.body.content,
        "ingredients": req.body.ingredients,
        "notes": req.body.notes,
        "region": req.body.region,
        "von": req.body.von,
        "foodtype": req.body.foodtype,
        "likes": req.body.likes
    }
    mongodb.connect('xxxxxxxxxxxxxxxxxxxxxx',(err,db)=>{
        if(err) throw err;
        else{
            db.collection('xxxxxxxxxx').insertOne(data,(err,result)=>{
                if(err) throw err
                else{
                    res.status(201).send("successfully sent")
                }
            })
        }

    })
  })