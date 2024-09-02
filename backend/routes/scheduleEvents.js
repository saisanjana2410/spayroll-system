// routes/events.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

// const uri = 'mongodb://127.0.0.1:27017/scheduled-Events?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1';
const uri = 'mongodb+srv://varshini:Varshini%40123@cluster0.gax7tov.mongodb.net/';

// Route 1: Fetch calendar events
router.get('/fetchEvents', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('scheduled-Events');
    const userEvents = await db.collection('user-events').find().toArray();
    res.json(userEvents);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route 2: Store calendar events
router.post('/putEvents', async (req, res) => {
    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('scheduled-Events');
      await db.collection('user-events').insertOne(req.body);
      res.send("Data inserted successfully");
    } 
    catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});


// Route 3: Delete an event
router.delete('/deleteEvent/:id', async (req, res) => {
    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('scheduled-Events');
      const eventId = req.params.id;
      // Validate if eventId is a valid ObjectId
      if (!ObjectId.isValid(eventId)) {
        return res.status(400).send('Invalid Event ID');
      }
      // Convert eventId to ObjectId
      const objectId = new ObjectId(eventId);
      // Delete the event by ObjectId
      const result = await db.collection('user-events').deleteOne({ _id: objectId });
      if (result.deletedCount === 1) {
        res.json({ message: 'Event deleted successfully' });
      } 
      else {
        res.status(404).json({ error: 'Event not found' });
      }
      client.close();
    } 
    catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});
  


module.exports = router;
