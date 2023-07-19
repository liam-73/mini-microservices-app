const express = require('express');
const cors = require('cors');
const axios = require('axios');

const port = process.env.PORT || 4003;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { postId, ...comment } = data;

    const post = posts[postId];
    post.comments.push(comment);
  }

  if (type === 'CommentUpdated') {
    const { postId, id, status, content } = data;

    const comments = posts[postId].comments;
    const comment = comments.find((c) => c.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  try {
    const { type, data } = req.body;

    handleEvent(type, data);
  } catch (e) {
    console.log(e.message);
  }
  res.send({});
});

app.listen(port, async () => {
  console.log('listening on port ', port);

  try {
    const res = await axios.get('http://localhost:4002/events');

    for (let event of res.data) {
      console.log('Processing event: ', event.type);

      handleEvent(event.type, event.data);
    }
  } catch (e) {
    console.log(e.message);
  }
});
