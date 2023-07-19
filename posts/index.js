const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('hola from posts service'));

const posts = {};

app.get('/posts', (req, res) => res.json(posts));

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post('http://localhost:4002/events', {
    type: 'PostCreated',
    data: { id, title },
  });

  res.status(201).json(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Recieved Event: ', req.body.type);

  res.send({});
});

app.listen(port, () => console.log('listening on port ', port));
