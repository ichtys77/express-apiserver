const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4')

const db = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  const randomItem = db.testimonials[Math.floor(Math.random()*db.testimonials.length)];
  res.json(randomItem);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => { 
  const { author, text } = req.body
  const opinion = {
    id: uuidv4(),
    author: author,
    text: text, 
  };
  db.testimonials.push(opinion);
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {

  const opinion = db.testimonials.filter(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials.splice(index, 1);

  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {

  const { author, text } = req.body;

  const changedTestimonial = {
    id: req.params.id, 
    author: author, 
    text: text
  }

  const opinion = db.testimonials.filter(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials[index] = changedTestimonial;

  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});