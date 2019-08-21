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
        <div className="plant-container">
          <div>

            <div>

            
              <table className="table plant-table is-bordered is-hoverable">
                <thead className="plant-head">
                  <tr>
                    <th className="plant-font">Plant Name</th>
                    <th>Image</th>
                    <th><abbr title="Destroyed By">Destroyed By</abbr></th>
                    <th><abbr title="Days to Maturation">Days to Maturation</abbr></th>
                    <th><abbr title="Germination">Germination</abbr></th>
                    <th><abbr title="Spacing">Spacing</abbr></th>
                    <th><abbr title="Pot Size">Pot Size</abbr></th>
                    <th><abbr title="Sow under Glass">Sow under Glass</abbr></th>
                    <th><abbr title="Sow under direct sunlight">Sow under direct sunlight</abbr></th>
                    <th><abbr title="Propagator">Propagator</abbr></th>
                    <th>Harvest Period</th>
                    <th>Seed Period</th>
                  </tr>
                </thead>


                <tbody>
                  {this.state.plants.map(plant =>
                    <tr key={plant._id}>
                      <td><p>{plant.name}</p></td>
                      <td><img src={plant.image} alt={plant.name}/></td>
                      <td><p>{plant.destroyedBy.map(pest => pest + ' ')}</p></td>
                      <td><p>{plant.daysToMaturation}</p></td>
                      <td><p>{plant.germination}</p></td>
                      <td><p>{plant.spacing}</p></td>
                      <td><p>{plant.potSize}</p></td>
                      <td><p>{plant.sowUnderGlass ? '✅' : '❌'}</p></td>
                      <td><p>{plant.sowUnderDirectSunlight ? '✅' : '❌'}</p></td>
                      <td><p>{plant.propagator ? '✅' : '❌'}</p></td>
                      <td><p>{plant.harvestPeriod.map(month => month + ' ')}</p></td>
                      <td><p>{plant.seedPeriod.map(month => month + ' ')}</p></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>
    )
  }
}


export default PlantsIndex
