const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { id, name, email, password, amount, login } = req.body;

    try {
        
        const client = await MongoClient.connect('mongodb://localhost:27017/avakai');
        const db = client.db('avakai');

    
        const existingUser = await db.collection('userdetails').findOne({ email });
        if (existingUser) {
          
            client.close();
            return res.status(400).send("Email already exists");
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const result = await db.collection('userdetails').insertOne({
            id: parseInt(id),
            name,
            email,
            password: hashedPassword,
            amount,
            login : Boolean(login)
        });

        
        client.close();

        
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send("An error occurred during registration");
    }
});

module.exports = router;
