const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');

app.use((req, res, next) => {
  req.user = {
    _id: '6478bbc9a7b6f219d4d676d1',
  };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Подключились к базе');
  }).catch((err) => {
    console.log('Ошибка подключения к базе', err);
  });

app.use('/', routerUsers);
app.use('/', routerCards);

app.listen(PORT);
