const mongoose = require('mongoose')
mongoose.Promise = require('bluebird') // pimp up mongoose's promises
const User = require('../models/User')
const Plot = require('../models/Plot')
const userData = require('./data/userData')
let plotData = require('./data/plotData')
const { dbURI } = require('../config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => {
    plotData = plotData.map(plot => {
      plot.user = users[0]
      return plot
    })

    return Plot.create(plotData)
  })
  .then(() => console.log('Successfully seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
