import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Card from '../common/Card'

class PlotsIndex extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get('/api/plots')
      .then(res => this.setState({ plots: res.data }))
  }


  render() {
    console.log(this.state.plots)
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">

            {!this.state.plots && <h2 className="title is-2">Loading ...</h2>}
            {this.state.plots && this.state.plots.map(plot =>
              <div className="column is-one-third-desktop" key={plot._id}>
                <Link to={`/plots/${plot._id}`}>
                  <Card
                    name={plot.name}
                    image={plot.image}
                    postCode={plot.postCode}
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

export default PlotsIndex
