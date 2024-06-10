const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { id, name, email, password, amount, login } = req.body;

    try {
        // Connect to MongoDB
        const client = await MongoClient.connect('mongodb://localhost:27017/avakai');
        const db = client.db('avakai');

        // Check if the email already exists
        const existingUser = await db.collection('userdetails').findOne({ email });
        if (existingUser) {
            // If email already exists, return error response
            client.close();
            return res.status(400).send("Email already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the database
        const result = await db.collection('userdetails').insertOne({
            id: parseInt(id),
            name,
            email,
            password: hashedPassword,
            amount,
            login : Boolean(login)
        });

        // Close the MongoDB connection
        client.close();

        // Return success response
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send("An error occurred during registration");
    }
});

module.exports = router;
