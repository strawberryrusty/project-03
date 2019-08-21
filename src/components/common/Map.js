import React from 'react'
import { Link } from 'react-router-dom'
import ReactMapboxGl, { Layer, Feature, ZoomControl, Popup } from 'react-mapbox-gl'
import icon from '../../assets/Carrot.png'



const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN
})

const layoutLayer = { 'icon-image': 'Plot' }
const image = new Image()
image.src = icon
image.height = '50'
image.width = '50'
const images = ['Plot', image]


class PlotsMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      center: [-0.1108, 51.5014],
      plots: this.props.plotsToDisplay,
      popPlot: null,
      zoom: [12, 12]
    }

    this.markerClick = this.markerClick.bind(this)
    this.mapClick = this.mapClick.bind(this)
  }

  mapClick() {
    if(this.state.popPlot) return this.setState({ popPlot: null})
  }

  markerClick(obj) {
    if(obj === this.state.popPlot) return this.setState({ popPlot: null})
    this.setState({
      center: [obj.longitude, obj.latitude],
      popPlot: obj,
      zoom: [14, 14]
    })
  }


  render() {
    return (
      <section className="box">
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          scrollZoom={this.disable}
          zoom={this.state.zoom}
          center={this.state.center}
          onClick={this.mapClick}
          containerStyle={{
            height: '70vh',
            width: '100%'
          }}
        >

          <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
            {this.props.plotsToDisplay.map(obj => (
              <Feature
                key={obj._id}
                coordinates={[obj.longitude, obj.latitude]}
                onClick={() => this.markerClick(obj)}
              />
            ))}
          </Layer>

          {this.state.popPlot && <Popup
            key={this.state.popPlot._id}
            coordinates={[ this.state.popPlot.longitude, this.state.popPlot.latitude]}
          >
            <h1 className="poptext is-size-5">{this.state.popPlot.name}</h1>
            <br />
            <h1 className="poptext is-size-6">Plot type: {this.state.popPlot.plotType}</h1>
            <h1 className="poptext is-size-6">Av Rating: {this.state.popPlot.averageRating}</h1>
            <h1 className="poptext is-size-6"><Link to={`/plots/${this.state.popPlot._id}`}>See more here..</Link></h1>
          </Popup>}


          <ZoomControl
            isEnabled= 'true'
          />
        </Map>

      </section>
    )
  }
}

export default PlotsMap
