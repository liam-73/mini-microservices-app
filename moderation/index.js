const express = require('express');
const axios = require('axios');

const port = process.env.PORT || 4003;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/events', (req, res) => {});

app.listen(port, () => console.log('listening on port ', port));
