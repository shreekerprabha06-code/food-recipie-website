const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/';
const dbName = 'Avakai';

router.post('/', async (req, res) => {
  const data = {
    title: req.body.title,
    imglink: req.body.imglink,
    process: req.body.process,
    ingredients: JSON.parse(req.body.ingredients),
    tips: req.body.tips,
    category: req.body.category,
    item: req.body.item,
    likes: [],
    email: req.body.email
  };

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    await db.collection('recipies').insertOne(data);

    client.close();
    res.status(201).send("Recipe successfully created");
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).send("Error creating recipe");
  }
});

module.exports = router;
