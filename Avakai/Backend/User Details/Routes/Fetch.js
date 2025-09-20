const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/Avakai?retryWrites=true&w=majority";

router.get('/', async (req, res) => {
  let client;

  try {
    client = await MongoClient.connect(uri); // connect to Atlas
    const db = client.db('Avakai');          // select DB
    const data = await db.collection('userdetails').find().toArray();

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (client) client.close(); // close connection
  }
});

module.exports = router;
