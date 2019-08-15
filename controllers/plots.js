const Plot = require('../models/Plot')

function indexRoute(req, res, next) {
  // get all the plots from the database: MONGOOSE
  Plot.find(req.query)
    .select('-comments') // remove the comments from this route ONLY
    .then(plots => res.json(plots)) // send them as JSON: EXPRESS
    .catch(next)
}

function createRoute(req, res, next) {
  // Add the current user to the req.body so that it will
  // be automatically added to the new plot
  req.body.user = req.currentUser._id

  const plot = new Plot(req.body) // create a new plot: MONGOOSE

  plot.save() // save it in the database: MONGOOSE
    .then(plot => res.status(201).json(plot)) // send it as JSON: EXPRESS
    .catch(next) // send any errors to the error handling middleware
}

function showRoute(req, res, next) {
  // the ID is now on req.params.id
  Plot.findById(req.params.id) // get the plot from the database: MONGOOSE
    .populate({ path: 'user', select: '-email' }) // replace the user ID with the actual user object, and DON'T send the email address...
    .populate({ path: 'comments.user', select: '-email' }) // replace the user ID with the actual user object
    .then(plot => {
      if(!plot) return res.sendStatus(404) // return a 404: EXPRESS

      return res.json(plot) // send it as JSON: EXPRESS
    })
    .catch(next)
}

function updateRoute(req, res, next) {
  Plot.findById(req.params.id) // get the plot from the database: MONGOOSE
    .then(plot => {
      if(!plot) return res.sendStatus(404) // return a 404: EXPRESS
      return plot.set(req.body) // update the plot with the request data
    })
    .then(plot => plot.save()) // save the plot: MONGOOSE
    .then(plot => res.json(plot)) // send the updated plot: EXPRESS
    .catch(next)
}

function deleteRoute(req, res, next) {
  Plot.findById(req.params.id) // get the plot from the database: MONGOOSE
    .then(plot => {
      if(!plot) return res.sendStatus(404) // return a 404: EXPRESS

      return plot.remove() // remove the plot: MONGOOSE
        .then(() => res.sendStatus(204)) // return a 204: EXPRESS
    })
    .catch(next)
}

// POST /plots/:id/comments
function commentCreateRoute(req, res, next) {

  req.body.user = req.currentUser._id

  Plot.findById(req.params.id)
    .then(plot => {
      if(!plot) return res.sendStatus(404)
      plot.comments.push(req.body)
      return plot.save()
    })

    .then(plot => Plot.populate(plot, 'user comments.user')) // populate the plots AFTER save!
    .then(plot => res.json(plot))
    .catch(next)
}

// DELETE /plots/:id/comments/:commentId
function commentDeleteRoute(req, res, next) {
  Plot.findById(req.params.id)
    .then(plot => {
      if(!plot) return res.sendStatus(404)

      // Find the comment by its ID
      const comment = plot.comments.id(req.params.commentId)
      if(!comment) return res.sendStatus(404)

      comment.remove() // remove the comment
      return plot.save() // save the plot
    })
    .then(plot => Plot.populate(plot, 'user comments.user'))
    .then(plot => res.json(plot))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}
