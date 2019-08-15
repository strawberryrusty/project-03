const env = process.env.NODE_ENV || 'development'
const dbURI = `mongodb://localhost:27017/plots-db-${env}`
const secret = 'Tgs5aG_^GH@lKmnN'


module.exports = { dbURI,secret }
