const express = require('express');
const router = express.Router();
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const dbName = 'avakai';


router.put('/like', (req, res) => {
  const { title, userEmail } = req.body;

  mongodb.connect(url, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return res.status(500).send("Error connecting to database");
    }

    const db = client.db(dbName);
    db.collection('recipies').findOneAndUpdate(
      { title, likes: { $nin: [userEmail] } }, 
      { $push: { likes: userEmail } }, 
      { returnOriginal: false },
      (err, result) => {
        client.close();
        if (err) {
          console.error('Error liking recipe:', err);
          return res.status(500).send("Error liking recipe");
        }
        res.status(200).json(result.value); 
      }
    );
  });
});


router.put('/unlike', (req, res) => {
  const { title, userEmail } = req.body;

  mongodb.connect(url, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return res.status(500).send("Error connecting to database");
    }

    const db = client.db(dbName);
    db.collection('recipies').findOneAndUpdate(
      { title, likes: { $in: [userEmail] } }, 
      { $pull: { likes: userEmail } }, 
      { returnOriginal: false },
      (err, result) => {
        client.close();
        if (err) {
          console.error('Error unliking recipe:', err);
          return res.status(500).send("Error unliking recipe");
        }
        res.status(200).json(result.value); 
      }
    );
  });
});

module.exports = router;
