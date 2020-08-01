const config = require('./utils/config');
const express = require('express');
const app = express();
const phRouter = require('./controllers/ph');
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/ph', phRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

module.exports = app