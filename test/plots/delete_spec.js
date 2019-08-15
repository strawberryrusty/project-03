/* global api, describe, it, expect, beforeEach, afterEach */
const Plot = require('../../models/Plot')
const User = require('../../models/User')
const plotData = require('../../db/data/plotData')
const userData = require('../../db/data/userData')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

describe('DELETE /plots/:id', () => {

  let plot = null
  let token = null

  beforeEach(done => {
    Plot.create(plotData)
      .then(plots => {
        plot = plots[0]
        return User.create(userData)
      })
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  afterEach(done => {
    Plot.remove({})
      .then(() => User.remove({}))
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.delete(`/api/plots/${plot._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/plots/${plot._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should actually delete the data', done => {
    api.delete(`/api/plots/${plot._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        Plot.findById(plot._id)
          .then(plot => {
            expect(plot).to.not.exist
            done()
          })
      })
  })
})
