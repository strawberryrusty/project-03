function errorHandler(err, req, res, next) {
  // receives any errors from previous middleware
  if(err.name === 'ValidationError') {
    // tidy up the mongoose error
    for(const key in err.errors) {
      err.errors[key] = err.errors[key].message
    }
    // send just the validation errors
    return res.status(422).json({ errors: err.errors })

  }
  res.sendStatus(500) // send a response
  next(err) // sends the error to the terminal
}

module.exports = errorHandler
