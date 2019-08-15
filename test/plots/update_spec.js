/* global api, describe, it, expect, beforeEach, afterEach */
const Plot = require('../../models/Plot')
const User = require('../../models/User')

const plotData = require('../../db/data/plotData')
const userData = require('../../db/data/userData')

const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testData = {
  name: 'Jeffs plot',
  plotType: 'Allotment',
  streetAddress: '65 Jeff street',
  latitude: 51.515,
  longitude: -0.08,
  postCode: 'FD5 GH7',
  bioWasteAccepted: false,
  numOfSlots: 12,
  slotsAvailable: true,
  facilities: ['water', 'sunlight', 'standard m8'],
  costInvolved: true,
  costPerAnnum: 3,
  ConditionsForUse: ['sick', 'one', 'mate'],
  Volunteer: false,
  primaryContactEmail: 'seed@seed.seed',
  primaryContactName: 'Mr Seed'
}

describe('PUT /plots/:id', () => {

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
    api.put(`/api/plots/${plot._id}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 200 response with a token', done => {
    api.put(`/api/plots/${plot._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/plots/${plot._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/api/plots/${plot._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'plotType',
          'streetAddress',
          'postCode',
          'latitude',
          'numOfSlots',
          'slotsAvailable',
          'bioWasteAccepted',
          'facilities',
          'costInvolved',
          'costPerAnnum',
          'ConditionsForUse',
          'Volunteer',
          'primaryContactName',
          'primaryContactEmail'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api.put(`/api/plots/${plot._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.streetAddress).to.eq(testData.streetAddress)
        expect(res.body.plotType).to.deep.eq(testData.plotType)
        expect(res.body.postCode).to.eq(testData.postCode)
        expect(res.body.latitude).to.eq(testData.latitude)
        expect(res.body.longitude).to.eq(testData.longitude)
        expect(res.body.numOfSlots).to.eq(testData.numOfSlots)
        expect(res.body.bioWasteAccepted).to.eq(testData.bioWasteAccepted)
        expect(res.body.slotsAvailable).to.eq(testData.slotsAvailable)
        expect(res.body.facilities).to.deep.eq(testData.facilities)
        expect(res.body.costInvolved).to.eq(testData.costInvolved)
        expect(res.body.costPerAnnum).to.eq(testData.costPerAnnum)
        expect(res.body.ConditionsForUse).to.deep.eq(testData.ConditionsForUse)
        expect(res.body.Volunteer).to.eq(testData.Volunteer)
        expect(res.body.primaryContactName).to.eq(testData.primaryContactName)
        expect(res.body.primaryContactEmail).to.eq(testData.primaryContactEmail)
        done()
      })
  })
})
