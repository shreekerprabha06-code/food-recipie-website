const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/Avakai?retryWrites=true&w=majority";

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    let client;

    try {
        client = await MongoClient.connect(uri);
        const db = client.db('Avakai');

        const user = await db.collection('userdetails').findOne({ email });
        if (!user) return res.status(404).send("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send("Invalid credentials");

        res.status(200).json({ message: "Login successful", user: { email: user.email, name: user.name } });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    } finally {
        if (client) client.close();
    }
});

module.exports = router;
