const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.getById = async (req, res) => {
  
    try {
      const seat = await Seat.findById(req.params.id);
      if(!seat) res.status(404).json({ message: 'Not found' });
      else res.json(seat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.postNew = async (req, res) => {
  
    try {
  
      const { day, seat, client, email } = req.body;
      const newSeat = new Seat(
        {         
          day: day,
          seat: seat,
          client: client,
          email: email
        }
      );
      await newSeat.save();
      res.json({newSeat});
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.edit = async (req, res) => {
    const { day, seat, client, email } = req.body;
  
    try {
      const seating = await(Seat.findById(req.params.id));
      if(seating) {
        seating.day = day;
        seating.seat = seat,
        seating.client = client;
        seating.email = email;
        await seating.save();
        res.json({ seating });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.deleteById = async (req, res) => {
  
    try {
      const seat = await(Seat.findById(req.params.id));
      if(seat) {
        await Seat.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};