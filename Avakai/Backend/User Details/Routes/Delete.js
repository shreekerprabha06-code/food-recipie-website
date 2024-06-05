const express = require('express')
const app = express()
const router = express.Router()
const mongodb = require('mongodb').MongoClient
module.exports = router.delete('/',(req,res)=>{
    const email = req.body.Email;
    mongodb.connect(link,(err,db)=>{
        if(err){
            console.error('Error in db');
        }
        else{
            db.collection(collectionname).deleteOne({Email:email},(err,record)=>{
                if(err){
                    console.log("while fetching data",err)
                }else{
                    if(record.deletedCount > 0){
                        res.status(200).send("deleted...",+email)
                    }else{
                        res.status(404).send("user not found")
                    }
                }
            })
        
        }
    })
})