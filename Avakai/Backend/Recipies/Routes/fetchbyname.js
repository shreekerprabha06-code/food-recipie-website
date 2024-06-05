const express = require('express')
const router = express.Router()
const mongodb = require('mongodb').MongoClient


    module.exports = router.get('/:name',(req,res)=>{
        mongodb.connect('xxxxxxxxxxxxxxxxxxxxxxxxxx',(err,db)=>{
            if(err) throw err;
            else{
             db.collection('xxxxxxxxxxxx').findOne({"name":req.params.name},(err,record)=>{
                if(err) throw err;
                else{
                    if(record){
                        res.status(200).json(record);
                    }else{
                        res.status(404).send("User not found");
                    }
                }
             })
            }     
        })
        
    })