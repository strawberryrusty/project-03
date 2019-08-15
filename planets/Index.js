import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Card from './Card'

class PlanetsIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      planets: []
    }
  }

  componentDidMount() {
    axios.get('/api/planets')
      .then(res => this.setState({ planets: res.data}))
  }

  render() {
    if(!this.state.planets) return <h2>Loading ...</h2>
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">{this.state.planets.map(planet =>
            <div
              key={planet._id}
              className="column is-one-third-desktop is-half-tablet">
              <Link to={`/planets/${planet._id}`}>
                <Card
                  name={planet.name}
                  image={planet.image}
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

export default PlanetsIndex
