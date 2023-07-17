const express = require('express');
const cors = require('cors');
const axios = require('axios');

const port = process.env.PORT || 4040;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('hola from event bus'));

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:8080/events', event);
  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);

  res.send({ status: 'OK' });
});

app.listen(port, () => console.log('listening on port ', port));
