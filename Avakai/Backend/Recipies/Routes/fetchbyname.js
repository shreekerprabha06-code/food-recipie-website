const express = require('express')
const router = express.Router()
const mongodb = require('mongodb').MongoClient


    module.exports = router.get('/:title',(req,res)=>{
        mongodb.connect('mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/Avakai',(err,db)=>{
            if(err) throw err;
            else{
             db.collection('recipies').findOne({"title":req.params.title},(err,record)=>{
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
