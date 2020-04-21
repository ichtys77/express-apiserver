const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 4, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomItem = db[Math.floor(Math.random()*db.length)];
  res.json(randomItem);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => { 
  const { author, text } = req.body
  const payload = {
    id: uuidv4(),
    author: author,
    text: text, 
  };
  db.push(payload);
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {

  const opinion = db.filter(item => item.id == req.params.id);
  const index = db.indexOf(opinion);
  db.splice(index, 1);

  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {

  const { author, text } = req.body;

  const changedTestimonial = {
    id: req.params.id, 
    author: author, 
    text: text
  }

  const opinion = db.filter(item => item.id == req.params.id);
  const index = db.indexOf(opinion);
  db[index] = changedTestimonial;

  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});