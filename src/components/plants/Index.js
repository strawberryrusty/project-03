import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PlantsCard from '../common/PlantsCard'

class PlantsIndex extends React.Component {
  constructor(){

    super()
    this.state={}
  }


  componentDidMount() {
    axios.get('/api/plants')
      .then(res => this.setState({ plants: res.data}))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">

            {!this.state.plants && <h2 className="title is-2">Loading...</h2>}

            {this.state.plants && this.state.plants.map(plant =>
              <div className="column is-one-quarter-desktop" key={plant._id}>
                <Link to={`/plants/${plant._id}`}>
                  <PlantsCard
                    name={plant.name}
                    image={plant.image}
                    germination= {plant.germination}
                    daysOfMaturation= {plant.daysOfMaturation}
                    spacing= {plant.spacing}
                    sowUnderGlass= {plant.sowUnderGlass}
                    sowUnderDirectSunlight= {plant.sowUnderDirectSunlight}
                    seedPeriod= {plant.seedPeriod}
                    harvestPeriod= {plant.harvestPeriod}
                    destroyedBy = {plant.destroyedBy}
                    propagator={plant.propagator}

                  />
                </Link>
              </div>
            )}

          </div>
        </div>
      </section>
    )
  }
}



export default PlantsIndex
