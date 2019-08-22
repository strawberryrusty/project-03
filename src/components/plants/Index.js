import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import PlantsCard from '../common/PlantsCard'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
          <div className="columns">
            <div className="column is-one-half">
              <div className="box tableBorder">
                <h1>Plant Index:</h1>
                <p>This a vegetable growing cheatsheet that you can use to grow your plants</p>
              </div>
            </div>
            <div className="column is-one-half">
              <div className="box tableKey">
                <h2 className="subtitle key">Key</h2>
                <div className="key columns">
                  <div className="green column">Harvest Period</div>
                  <div className="orange column">Seed Period</div>
                </div>
              </div>
            </div>
          </div>
          <div className="container scroll-x tableBorder">
            <table className="table plant-table is-bordered is-hoverable is-fullwidth">
              <thead className="plant-head">
                <tr>
                  <th className="plant-font">Plant Name</th>
                  <th>Image</th>
                  <th className="tableoption" title="Destroyed By">Destroyed By</th>
                  <th className="tableoption" title="Days to Maturation">Days to maturation (days)</th>
                  <th className="tableoption" title="Germination">Germination (days)</th>
                  <th className="tableoption" title="Spacing">Spacing (cm) </th>
                  <th className="tableoption" title="Pot Size">Pot Size (cm)</th>
                  <th className="tableoption" title="Sow under Glass">Sow under Glass?</th>
                  <th className="tableoption" title="Sow under direct sunlight">Sow under direct sunlight?</th>
                  <th className="tableoption" title="Propagator">Propagator needed?</th>
                  <th className="tableoption">January</th>
                  <th className="tableoption">February</th>
                  <th className="tableoption">March</th>
                  <th className="tableoption">April</th>
                  <th className="tableoption">May</th>
                  <th className="tableoption">June</th>
                  <th className="tableoption">July</th>
                  <th className="tableoption">August</th>
                  <th className="tableoption">September</th>
                  <th className="tableoption">October</th>
                  <th className="tableoption">November</th>
                  <th className="tableoption">December</th>
                </tr>
              </thead>


              <tbody>
                {this.state.plants.map(plant =>
                  <tr key={plant._id}>
                    <td><p className="plantprop">{plant.name}</p></td>
                    <td><img src={plant.image} alt={plant.name} className="plantimage"/></td>
                    <td><p className="plantprop">{plant.destroyedBy.map((pest, i) => i !== plant.destroyedBy.length - 1 ? pest + ', ' : pest)}</p></td>
                    <td><p className="plantprop">{plant.daysToMaturation}</p></td>
                    <td><p className="plantprop">{plant.germination}</p></td>
                    <td><p className="plantprop">{plant.spacing}</p></td>
                    <td><p className="plantprop">{plant.potSize}</p></td>
                    <td><p className="plantprop">{plant.sowUnderGlass ? '✅' : '❌'}</p></td>
                    <td><p className="plantprop">{plant.sowUnderDirectSunlight ? '☀️' : '❌'}</p></td>
                    <td><p className="plantprop">{plant.propagator ? '✅' : '❌'}</p></td>
                    {months.map(month =>
                      <td key={month}>
                        {<div className={`${plant.seedPeriod.includes(month) ? 'is-seed-period' : ''}`} />}
                        {<div className={`${plant.harvestPeriod.includes(month) ? 'is-harvest-period' : ''}`} />}
                      </td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }
}


export default PlantsIndex
