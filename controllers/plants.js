const Plant = require('../models/Plant')

function indexRoute(req, res, next) {
  // get all the plots from the database: MONGOOSE
  Plant.find(req.query)
    .then(plants => res.json(plants)) // send them as JSON: EXPRESS
    .catch(next)
}

module.exports = {
  index: indexRoute
}
