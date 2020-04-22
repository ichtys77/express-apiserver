const express = require('express');
const router = express.Router();
const db = require('../db');

const uuidv4 = require('uuid/v4')

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => { 
  const { day, seat, client, email } = req.body
  const newSeat = {
    id: uuidv4(),
    day: day,
    seat: seat,
    client: client,
    email: email, 
  };

  if (db.seats.some(item => (item.seat === newSeat.seat && item.day === newSeat.day))) {
    res.json({message: 'The slot is already taken...'});
  } else {
  db.seats.push(newSeat);
  res.json({ message: 'OK' });
  }

});

router.route('/seats/:id').delete((req, res) => {

  const seat = db.seats.filter(item => item.id == req.params.id);
  const index = db.seats.indexOf(seat);
  db.seats.splice(index, 1);

  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {

  const { day, seat, client, email } = req.body;

  const changedSeat = {
    id: req.params.id, 
    day: day,
    seat: seat,
    client: client,
    email: email, 
  }

  const oldSeat = db.seats.filter(item => item.id == req.params.id);
  const index = db.seats.indexOf(oldSeat);
  db.seats[index] = changedSeat;

  res.json({ message: 'OK' });
});

module.exports = router