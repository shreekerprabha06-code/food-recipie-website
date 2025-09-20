const express = require('express');
const router = express.Router();
const mongodb = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');

module.exports = router.post('/', (req, res) => {
    const { email, password, login } = req.body;

    mongodb.connect('mongodb+srv://shreeker027:ihJ2UQg4Rr4WTG4X@cluster0.qtmxkjb.mongodb.net/Avakai', async (err, db) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ message: 'An error occurred while connecting to the database' });
        }

        try {
            const collection = db.collection('userdetails');
            const user = await collection.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                await collection.updateOne({ email }, { $set: { login: Boolean(login) } });
                res.status(200).json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            res.status(500).json({ message: 'An error occurred during authentication' });
        } finally {
            db.close();
        }
    });
});
