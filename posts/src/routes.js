const router = require('express').Router();
const { randomBytes } = require('crypto');

module.exports = () => {
  const posts = {};

  router.get('/', (req, res) => res.json(posts));

  router.post('/', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title };

    res.status(201).json(posts[id]);
  });

  return router;
};
