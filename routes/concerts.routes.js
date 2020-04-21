const express = require('express');
const router = express.Router();
const db = require('../db');

const uuidv4 = require('uuid/v4')

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => { 
  const { performer, genre, price, day, image } = req.body
  const concert = {
    id: uuidv4(),
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image 
  };
  db.concerts.push(concert);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {

  const concert = db.concerts.filter(item => item.id == req.params.id);
  const index = db.concerts.indexOf(concert);
  db.concerts.splice(index, 1);

  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {

  const { performer, genre, price, day, image } = req.body;

  const changedConcert = {
    id: req.params.id, 
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image
  }

  const concert = db.concerts.filter(item => item.id == req.params.id);
  const index = db.concerts.indexOf(concert);
  db.concerts[index] = changedConcert;

  res.json({ message: 'OK' });
});

module.exports = router