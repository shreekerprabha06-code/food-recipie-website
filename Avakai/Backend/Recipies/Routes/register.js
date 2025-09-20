const express = require('express')
const router = express.Router()
const mongodb = require('mongodb').MongoClient

  module.exports = router.post('/',(req,res)=>{
    const  data = {
        "title": req.body.title,
        "imglink":req.body.imglink,
        "process": req.body.process,
        "ingridients": JSON.parse(req.body.ingredients),
        "tips": req.body.tips,
        "category": req.body.category,
        "item": req.body.item,
        "likes": [],
        "email": req.body.email
    }
    mongodb.connect('mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/',(err,db)=>{
        if(err) throw err;
        else{
            db.collection('recipies').insertOne(data,(err,result)=>{
                if(err) throw err
                else{
                    res.status(201).send("successfully sent")
                }
            })
        }

    })
  })
