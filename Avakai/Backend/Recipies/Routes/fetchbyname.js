const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/';
const dbName = 'Avakai';

router.get('/:title', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const recipe = await db.collection('recipies').findOne({ title: req.params.title });

    client.close();

    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).send("Recipe not found");
    }
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).send("Error fetching recipe");
  }
});

module.exports = router;
