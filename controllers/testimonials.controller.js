const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

};

exports.getById = async (req, res) => {

    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if(!testimonial) res.status(404).json({ message: 'Not found' });
      else res.json(testimonial);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

};

exports.postNew = async (req, res) => {

    try {

      const { author, text } = req.body;
      const newTestimonial = new Testimonial(
        {         
          author: author,
          text: text
        }
      );
      await newTestimonial.save();
      res.json({newTestimonial});

    } catch(err) {
      res.status(500).json({ message: err });
    }

};

exports.edit = async (req, res) => {
    const { author, text } = req.body;

    try {
      const testimonial = await(Testimonial.findById(req.params.id));
      if(testimonial) {
        testimonial.author = author;
        testimonial.text = text,
        await testimonial.save();
        res.json({ testimonial });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

};

exports.deleteById = async (req, res) => {

    try {
      const testimonial = await(Testimonial.findById(req.params.id));
      if(testimonial) {
        await Testimonial.deleteOne({ _id: req.params.id });
        res.json({ testimonial });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

};