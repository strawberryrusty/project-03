/* global api, describe, it, expect, beforeEach, afterEach */
const Plant = require('../../models/Plant')
const plantData = require('../../db/data/plantData')

describe('GET /plants', () => {

  beforeEach(done => {
    Plant.create(plantData)
      .then(() => done())
  })

  afterEach(done => {
    Plant.remove({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/plants')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/plants')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/plants')
      .end((err, res) => {
        res.body.forEach(plant => {
          expect(plant).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/plants')
      .end((err, res) => {
        res.body.forEach(plant => {
          expect(plant).to.includes.keys([
            '_id',
            'name',
            'germination',
            'potSize',
            'daysToMaturation',
            'spacing',
            'sowUnderGlass',
            'sowUnderDirectSunlight',
            'propagator',
            'seedPeriod',
            'harvestPeriod',
            'destroyedBy'
          ])
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get('/api/plants')
      .end((err, res) => {
        res.body.forEach(plant => {
          expect(plant._id).to.be.a('string')
          expect(plant.name).to.be.a('string')
          expect(plant.germination).to.be.a('number')
          expect(plant.potSize).to.be.a('number')
          expect(plant.daysToMaturation).to.be.a('number')
          expect(plant.spacing).to.be.a('number')
          expect(plant.sowUnderGlass).to.be.a('boolean')
          expect(plant.sowUnderDirectSunlight).to.be.a('boolean')
          expect(plant.propagator).to.be.a('boolean')
          expect(plant.seedPeriod).to.be.a('array')
          expect(plant.harvestPeriod).to.be.a('array')
          expect(plant.destroyedBy).to.be.an('array')

        })
        done()
      })
  })
})
