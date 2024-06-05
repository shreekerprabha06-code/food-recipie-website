const express = require('express')
const { link } = require('./Register')
const app = express()
const router = express.Router()
const mongodb = require('mongodb').MongoClient
module.exports = router.put('/',(req,res)=>{
    const NAME = req.body.Name;
    const data = req.body;
    mongodb.connect(link,(err,db)=>{
        if(err) throw err
        else{
            db.collection(collectionname).updateOne({Name: NAME}, {$set: data}, (err,record)=>{
                if(err){
                    console.log("while fetching data",err)
                }else{
                    if(record.modifiedCount > 0){
                        res.status(200).send("updated")
                    }else{
                        res.status(404).send("user not found")
                    }
                }
            })
        
        }
    })
})