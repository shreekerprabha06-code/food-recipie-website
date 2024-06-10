const express = require('express')
const router = express.Router()
const mongodb = require('mongodb').MongoClient


    module.exports = router.get('/',(req,res)=>{
        mongodb.connect('mongodb://localhost:27017/avakai',(err,db)=>{
            if(err) throw err;
            else{
             db.collection('recipies').find().toArray((err,data)=>{
                if(err){
                    console.error("While fetching data from Collection ",err);
                }else{
                    if(data.length > 0){
                        res.status(200).json(data);
                    }else{
                        res.status(404).send("User not found");
                    }
                }
             })
            }     
        })
        
    })