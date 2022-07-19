require('dotenv').config();

const { PORT = 3001 } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { errorProcessor } = require('./middlewares/error-processor');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/index');

const options = {
  origin: [
    'http://localhost:3000',
    'https://mesto.blz.nomoredomains.xyz',
    'https://Elena-BLZ.github.io',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use('*', cors(options));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes); // весь роутинг там

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(errorProcessor);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
