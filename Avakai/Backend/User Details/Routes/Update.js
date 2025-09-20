const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/Avakai?retryWrites=true&w=majority";

router.put('/', async (req, res) => {
    const { email, password, ...updateData } = req.body;
    let client;

    try {
        client = await MongoClient.connect(uri);
        const db = client.db('Avakai');

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const record = await db.collection('userdetails').updateOne(
            { email },
            { $set: updateData }
        );

        if (record.modifiedCount > 0) {
            res.status(200).json("Updated successfully");
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    } finally {
        if (client) client.close();
    }
});

module.exports = router;
