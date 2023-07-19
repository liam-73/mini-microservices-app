const express = require('express');
const cors = require('cors');
const axios = require('axios');

const port = process.env.PORT || 4002;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('hola from event bus'));

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios
    .post('http://localhost:4000/events', event)
    .catch((e) => console.log(e.message));
  axios
    .post('http://localhost:4001/events', event)
    .catch((e) => console.log(e.message));
  axios
    .post('http://localhost:4003/events', event)
    .catch((e) => console.log(e.message));
  axios
    .post('http://localhost:4004/events', event)
    .catch((e) => console.log(e.message));

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(port, () => console.log('listening on port ', port));
