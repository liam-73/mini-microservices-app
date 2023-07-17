const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const commentsByPostId = {};

app.get('/', (req, res) => res.send('hola from comments service'));

app.get('/posts/:id/comments', (req, res) =>
  res.send(commentsByPostId[req.params.id] || [])
);

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4040/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id },
  });

  res.status(201).json(comments);
});

app.post('/events', (req, res) => {
  console.log('Recieved Event: ', req.body.type);

  res.send({});
});

app.listen(port, () => console.log('listening on port ', port));
