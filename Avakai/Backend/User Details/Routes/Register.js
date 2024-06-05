const express = require('express');
const router = express.Router();
const {MongoClient}  = require('mongodb');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    const { Name, Email, Password  } = req.body;
    bcrypt.hash(Password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send("Error");
        }
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if (err) {
                return res.status(500).send("Error");
        
    }
            const db = client.db('name');
            db.collection('collection name').insertOne({ Name, Email, Password: hashedPassword }, (err, result) => {
                client.close(); 
                if (err) {
                    return res.status(500).send("Error");
                }
                res.status(200).send("success....");
            });
        });
    });
});

module.exports = router;
