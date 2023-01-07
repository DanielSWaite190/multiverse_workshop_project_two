const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi Mom!')
})

module.exports = app;