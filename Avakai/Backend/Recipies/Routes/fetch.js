const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/';
const dbName = 'Avakai';

router.get('/', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const data = await db.collection('recipies').find().toArray();

    client.close();

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).send("No recipes found");
    }
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).send("Error fetching recipes");
  }
});

module.exports = router;
