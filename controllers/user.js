const User = require('../models/User')

function indexRoute(req, res, next) {
  // get all the plots from the database: MONGOOSE
  User.find(req.query)
    .then(users => res.json(users)) // send them as JSON: EXPRESS
    .catch(next)
}

function showRoute(req, res, next) {
  User.findById(req.params.id) // get the plot from the database: MONGOOSE
    .populate({ path: 'user', select: '-email' }) // replace the user ID with the actual user object, and DON'T send the email address...
    .populate({ path: 'comments.user', select: '-email' }) // replace the user ID with the actual user object
    .then(plot => {
      if(!plot) return res.sendStatus(404) // return a 404: EXPRESS

      return res.json(plot) // send it as JSON: EXPRESS
    })
    .catch(next)
}

module.exports = {
  show: showRoute,
  index: indexRoute
}
