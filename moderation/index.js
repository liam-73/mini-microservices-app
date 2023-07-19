const express = require('express');
const axios = require('axios');

const port = process.env.PORT || 4004;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  const { content } = data;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'REJECTED' : 'APPROVED';

    await axios.post('http://localhost:4002/events', {
      type: 'CommentModerated',
      data: { status, content, id: data.id, postId: data.postId },
    });
  }

  res.send({});
});

app.listen(port, () => console.log('listening on port ', port));
