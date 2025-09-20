const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/Avakai?retryWrites=true&w=majority";

router.delete('/', async (req, res) => {
    const { email } = req.body;
    let client;

    try {
        client = await MongoClient.connect(uri);
        const db = client.db('Avakai');

        const record = await db.collection('userdetails').deleteOne({ email });

        if (record.deletedCount > 0) {
            res.status(200).json(`Deleted: ${email}`);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    } finally {
        if (client) client.close();
    }
});

module.exports = router;
