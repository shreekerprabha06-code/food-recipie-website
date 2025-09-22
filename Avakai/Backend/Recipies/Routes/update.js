const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/';
const dbName = 'Avakai';

router.put('/like', async (req, res) => {
  const { title, userEmail } = req.body;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const result = await db.collection('recipies').findOneAndUpdate(
      { title, likes: { $nin: [userEmail] } },
      { $push: { likes: userEmail } },
      { returnDocument: "after" }
    );

    client.close();
    res.status(200).json(result.value);
  } catch (err) {
    console.error("Error liking recipe:", err);
    res.status(500).send("Error liking recipe");
  }
});

router.put('/unlike', async (req, res) => {
  const { title, userEmail } = req.body;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const result = await db.collection('recipies').findOneAndUpdate(
      { title, likes: { $in: [userEmail] } },
      { $pull: { likes: userEmail } },
      { returnDocument: "after" }
    );

    client.close();
    res.status(200).json(result.value);
  } catch (err) {
    console.error("Error unliking recipe:", err);
    res.status(500).send("Error unliking recipe");
  }
});

module.exports = router;
