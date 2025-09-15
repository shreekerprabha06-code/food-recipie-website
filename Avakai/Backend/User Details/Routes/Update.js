const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

router.put('/', (req, res) => {
    const email = req.body.email;
    const updateData = req.body; 

   
    delete updateData.email;

    const updateDocument = (data) => {
        MongoClient.connect('mongodb://localhost:27017/avakai', (err, client) => {
            if (err) {
                return res.status(500).send("Error connecting to database");
            }

            const db = client.db('avakai'); 

            
            db.collection('userdetails').updateOne(
                { email: email },
                { $set: data },
                (err, record) => {
                    client.close(); 
                    if (err) {
                        return res.status(500).send("Error updating data");
                    }
                    if (record.modifiedCount > 0) {
                        res.status(200).json("updated....");
                    } else {
                        res.status(404).send("User not found");
                    }
                }
            );
        });
    };

    
    if (updateData.password) {
        
        bcrypt.hash(updateData.password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).send("Error hashing password");
            }
            
            updateData.password = hashedPassword;
            
            updateDocument(updateData);
        });
    } else {
       
        updateDocument(updateData);
    }
});

module.exports = router;
