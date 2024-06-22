const express = require('express')
const router = express.Router()
const mongodb = require('mongodb').MongoClient


    module.exports = router.delete('/',(req,res)=>{
        const title = req.body.title
        mongodb.connect('mongodb://localhost:27017/avakai',(err,db)=>{
            if(err) throw err;
            else{
             db.collection('recipies').deleteOne({title:title},(err,record)=>{
                if(err) throw err;
                else{
                    if(record.deletedCount>0){
                        res.status(200).json("deleted...."+title)
                    }else{
                        res.status(404).send("User not found")
                    }
                }
             })
            }     
        })
        
    })