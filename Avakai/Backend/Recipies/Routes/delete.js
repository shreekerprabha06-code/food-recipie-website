const express = require('express')
const router = express.Router()
const mongodb = require('mongodb').MongoClient


    module.exports = router.delete('/',(req,res)=>{
        const name = req.body.name
        mongodb.connect('xxxxxxxxxxxxxxxxxxxxxxxxx',(err,db)=>{
            if(err) throw err;
            else{
             db.collection('xxxxxx').deleteOne({name:name},(err,record)=>{
                if(err) throw err;
                else{
                    if(record.deletedCount>0){
                        res.status(200).json("deleted...."+name)
                    }else{
                        res.status(404).send("User not found")
                    }
                }
             })
            }     
        })
        
    })