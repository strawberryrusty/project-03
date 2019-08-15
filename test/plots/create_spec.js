/* global api, describe, it, expect, afterEach, beforeEach */
const Plot = require('../../models/Plot')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testUser = {
  username: 'seed',
  email: 'seed@seed.seed',
  password: 'seed'
}
const testData = {
  name: 'Jeffs plot',
  plotType: 'Allotment',
  streetAddress: '65 Jeff street',
  latitude: 51.515,
  longitude: -0.08,
  postCode: 'FD5 GH7',
  sizeInMeters: 6,
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

describe('POST /plots', () => {

  let token = null

  beforeEach(done => {
    User.create(testUser)
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
    api.post('/api/plots')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api.post('/api/plots')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/plots')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.post('/api/plots')
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
          'sizeInMeters',
          'numOfSlots',
          'slotsAvailable',
          'facilities',
          'costInvolved',
          'costPerAnnum',
          'ConditionsForUse',
          'Volunteer',
          'comments',
          'primaryContactName',
          'primaryContactEmail',
          'user'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api.post('/api/plots')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.streetAddress).to.eq(testData.streetAddress)
        expect(res.body.plotType).to.deep.eq(testData.plotType)
        expect(res.body.postCode).to.eq(testData.postCode)
        expect(res.body.latitude).to.eq(testData.latitude)
        expect(res.body.longitude).to.eq(testData.longitude)
        expect(res.body.sizeInMeters).to.eq(testData.sizeInMeters)
        expect(res.body.numOfSlots).to.eq(testData.numOfSlots)
        expect(res.body.slotsAvailable).to.eq(testData.slotsAvailable)
        expect(res.body.facilities).to.deep.eq(testData.facilities)
        expect(res.body.costInvolved).to.eq(testData.costInvolved)
        expect(res.body.costPerAnnum).to.eq(testData.costPerAnnum)
        expect(res.body.ConditionsForUse).to.deep.eq(testData.ConditionsForUse)
        expect(res.body.Volunteer).to.eq(testData.Volunteer)
        expect(res.body.comments).to.deep.eq(testData.comments)
        expect(res.body.primaryContactName).to.eq(testData.primaryContactName)
        expect(res.body.primaryContactEmail).to.eq(testData.primaryContactEmail)
        expect(res.body.user).to.deep.eq(testData.user)
        done()
      })
  })
})
