const express = require('express');
const cors = require('cors');
const routes = require('./routes')();

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('hola from comments service'));
app.use('/posts', routes);

app.listen(port, () => console.log('listening on port ', port));
