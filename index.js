const express = require('express')
const bodyParser = require('body-parser')

const app = express()


app.use(bodyParser.json()) // tell express to use body parser package AND to handle JSON

app.get('/', (req, res) => {
  res.json({ message: 'Hello world!' }) //JSON
})


app.listen(4000, () => console.log('Express is listening to port 4000'))
