const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/';
const dbName = 'Avakai';

router.delete('/', async (req, res) => {
  const { title } = req.body;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const result = await db.collection('recipies').deleteOne({ title });

    client.close();

    if (result.deletedCount > 0) {
      res.status(200).json({ message: `Deleted recipe: ${title}` });
    } else {
      res.status(404).send("Recipe not found");
    }
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).send("Error deleting recipe");
  }
});

module.exports = router;
