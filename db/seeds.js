const mongoose = require('mongoose')
mongoose.Promise = require('bluebird') // pimp up mongoose's promises
const Plot = require('../models/Plot')
const plotData = require('./data/plotData')
const { dbURI } = require('../config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => Plot.create(plotData))
  .then(() => console.log('Successfully seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
