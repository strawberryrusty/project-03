const mongoose = require('mongoose')
mongoose.Promise = require('bluebird') // pimp up mongoose's promises
const User = require('../models/User')
const Plot = require('../models/Plot')
const Plant = require('../models/Plant')
const userData = require('./data/userData')
let plotData = require('./data/plotData')
let plantData = require('./data/plantData')
const { dbURI } = require('../config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => {
    plotData = plotData.map(plot => {
      plot.user = users[0]

      if(plot.comments) {
        plot.comments = plot.comments.map((comment, index) => {
          comment.user = index % 2 === 0 ? users[1] : users[2]
          return comment
        })
      }
      return plot
    })

    return Plot.create(plotData)
  })
  .then(users => {
    plantData = plantData.map(plant => {
      plant.user = users[0]
      return plant
    })

    return Plant.create(plantData)
  })

  .then(() => console.log('Successfully seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
