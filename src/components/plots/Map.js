


import React from 'react'
import ReactMapboxGl, { Layer, Feature, ZoomControl } from 'react-mapbox-gl'
import axios from 'axios'
import icon from '../../assets/Carrot.png'
console.log(icon)


const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN
})

// Define layout to use in Layer component
const layoutLayer = { 'icon-image': 'Plot' }

// Create an image for the Layer
const image = new Image()
image.src = icon
image.height = '50'
image.width = '50'
const images = ['Plot', image]



class PlotsMap extends React.Component {

  constructor() {
    super()
    this.state = {
      center: [-0.1108, 51.5014],
      plots: []
    }
  }

  componentDidMount() {
    axios.get('/api/plots')
      .then(res => this.setState({ plots: res.data }))
  }

  render() {
    if(!this.state.plots) return <h2 className="title is-2">Loading ...</h2>
    this.state.plots.forEach(obj => console.log(obj))
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-4">Find your plot in London...</h1>

          <Map
            style="mapbox://styles/mapbox/streets-v9"
            scrollZoom={true}
            center={this.state.center}
            containerStyle={{
              height: '70vh',
              width: '100%'
            }}
          >

            <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
              {this.state.plots.map(object => (
                <Feature
                  key={object._id}
                  coordinates={[ object.longitude, object.latitude]}
                />
              ))}
            </Layer>

            <ZoomControl
              isEnabled= 'true'
            />
          </Map>

        </div>
      </section>
    )
  }
}

export default PlotsMap
