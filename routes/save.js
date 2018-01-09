const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sfmc', {useMongoClient: true});

const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  countries: Array,
  imageUrl: String
});

const Form = mongoose.model('Form', formSchema);

router.post('/', (req, res) => {
  const myData = new Form(req.body);
  myData.save()
    .then(item => {
      res.send('item saved to database');
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});

module.exports = router;
