const express = require('express')
const router = express.Router()
const mongodb = require('mongodb').MongoClient


    module.exports = router.get('/',(req,res)=>{
        mongodb.connect('mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/Avakai',(err,db)=>{
            if(err) throw err;
            else{
             db.collection('userdetails').find().toArray((err,data)=>{
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
