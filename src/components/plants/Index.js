import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import PlantsCard from '../common/PlantsCard'

class PlantsIndex extends React.Component {
  constructor(){

    super()
    this.state={
      plants: []
    }
  }


  componentDidMount() {
    axios.get('/api/plants')
      .then(res => this.setState({ plants: res.data}))
  }

  render() {
    // if(!this.state.plants) return null
    console.log(this.state.plants)
    return (
      <section className="section plant-section">
        <div className="container scroll-x">
          <table className="table plant-table is-bordered is-hoverable is-fullwidth">
            <thead className="plant-head">
              <tr>
                <th className="plant-font">Plant Name</th>
                <th>Image</th>
                <th>Destroyed By</th>
                <th>Days to Maturation</th>
                <th>Germination</th>
                <th>Spacing</th>
                <th>Pot Size</th>
                <th>Sow under Glass</th>
                <th>Sow under direct sunlight</th>
                <th>Propagator</th>
                <th>Seed Period</th>
                <th>Harvest Period</th>
              </tr>
            </thead>


            <tbody>
              {this.state.plants.map(plant =>
                <tr key={plant._id}>
                  <td><p>{plant.name}</p></td>
                  <td><img src={plant.image} alt={plant.name} height="100" width="200"/></td>
                  <td><p>{plant.destroyedBy.map(pest => pest + ' ')}</p></td>
                  <td><p>{plant.daysToMaturation}</p></td>
                  <td><p>{plant.germination}</p></td>
                  <td><p>{plant.spacing}</p></td>
                  <td><p>{plant.potSize}</p></td>
                  <td><p>{plant.sowUnderGlass ? '✅' : '❌'}</p></td>
                  <td><p>{plant.sowUnderDirectSunlight ? '☀️' : '❌'}</p></td>
                  <td><p>{plant.propagator ? '✅' : '❌'}</p></td>
                  <td><p>{plant.harvestPeriod.map(month => month + ' ')}</p></td>
                  <td><p>{plant.seedPeriod.map(month => month + ' ')}</p></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    )
  }
}


export default PlantsIndex
