/* global api, describe, it, expect, beforeEach, afterEach */
const Plot = require('../../models/Plot')
const plotData = require('../../db/data/plotData')

describe('GET /plots/:id', () => {

  let plot = null

  beforeEach(done => {
    Plot.create(plotData)
      .then(plots => {
        plot = plots[0]
        done()
      })
  })

  afterEach(done => {
    Plot.remove({})
      .then(() => done())
  })

  it('should return a 200 response with a token', done => {
    api.get(`/api/plots/${plot._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/plots/${plot._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/api/plots/${plot._id}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'plotType',
          'streetAddress',
          'postCode',
          'latitude',
          'bioWasteAccepted',
          'numOfSlots',
          'slotsAvailable',
          'facilities',
          'costInvolved',
          'costPerAnnum',
          'conditionsForUse',
          'Volunteer',
          'primaryContactName',
          'primaryContactEmail'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get(`/api/plots/${plot._id}`)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.streetAddress).to.be.a('string')
        expect(res.body.plotType).to.be.a('string')
        expect(res.body.postCode).to.be.a('string')
        expect(res.body.latitude).to.be.a('number')
        expect(res.body.longitude).to.be.a('number')
        expect(res.body.numOfSlots).to.be.a('number')
        expect(res.body.slotsAvailable).to.be.a('boolean')
        expect(res.body.bioWasteAccepted).to.be.a('boolean')
        expect(res.body.facilities).to.be.an('array')
        expect(res.body.costInvolved).to.be.a('boolean')
        expect(res.body.costPerAnnum).to.be.a('number')
        expect(res.body.conditionsForUse).to.be.a('array')
        expect(res.body.Volunteer).to.be.a('boolean')
        expect(res.body.primaryContactName).to.be.a('string')
        expect(res.body.primaryContactEmail).to.be.a('string')
        done()
      })
  })
})
