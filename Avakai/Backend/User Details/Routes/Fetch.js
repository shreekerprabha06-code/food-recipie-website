const express = require('express')
const app = express()
const router = express.Router()
const mongodb = require('mongodb').MongoClient
module.exports = router.get('/',(req,res)=>{
    mongodb.connect(link,(err,db)=>{
     if(err) throw err
     else{
        db.collection('collection name').find().toArray((err,data)=>{
            if(err){
                console.log("while fetching error")
            }
            else{
                if(data.length > 0){
                    res.status(200).json(data)
                }
            }
        })
     }
    })
})
