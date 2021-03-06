const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sfmc', {useMongoClient: true});

const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  country: Array,
  image: String,
  action: String
});

const Form = mongoose.model('Form', formSchema);

router.post('/', (req, res) => {
  const myData = new Form(req.body);
  myData.save()
    .then(() => {
      res.send('Item saved to database');
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send('Unable to save to database');
    });
});

module.exports = router;
