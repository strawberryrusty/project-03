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
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.plants.map(plant =>
              <div key={plant._id} >
                <div className="column is-half">
                  <img className="PutImage" src={plant.image} alt={plant.name}/>
                </div>
                <div className="column is-half">
                  <div className="table-container">
                    <table className="table">
                      <tr>
                        <td><p>Name:</p></td>
                        <td><p>{plant.name}</p></td>
                      </tr>
                      <tr>
                        <td><p>Germination:</p></td>
                        <td><p>{plant.germination}</p></td>
                      </tr>
                      <tr>
                        <td><p>Days of Maturation:</p></td>
                        <td><p>{plant.daysOfMaturation}</p></td>
                      </tr>
                      <tr>
                        <td><p>Spacing:</p></td>
                        <td><p>{plant.spacing}</p></td>
                      </tr>
                      <tr>
                        <td><p>Sow under glass:</p></td>
                        <td><p>{plant.sowUnderGlass ? '✅' : '❌'}</p></td>
                      </tr>
                      <tr>
                        <td><p>Sow under direct sunlight:</p></td>
                        <td><p>{plant.sowUnderDirectSunlight ? '✅' : '❌'}</p></td>
                      </tr>
                      <tr>
                        <td><p>Seed Period:</p></td>
                        <td><p>{plant.seedPeriod.map(month => month + ' ')}</p></td>
                      </tr>
                      <tr>
                        <td><p>Harvest Period:</p></td>
                        <td><p>{plant.harvestPeriod.map(month => month + ' ')}</p></td>
                      </tr>
                      <tr>
                        <td><p>Destroyed By:</p></td>
                        <td><p>{plant.destroyedBy.map(pest => pest + ' ')}</p></td>
                      </tr>
                      <tr>
                        <td><p>Propagator:</p></td>
                        <td><p>{plant.propagator ? '✅' : '❌'}</p></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}


export default PlantsIndex
