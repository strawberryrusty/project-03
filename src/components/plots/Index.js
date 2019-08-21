import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const _ = require('lodash').runInContext()

import Card from '../common/Card'
import PlotsMap from '../common/Map'
import Auth from '../../lib/Auth'
import { truncate } from '../../../lib/helpers'

class PlotsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      searchTerm: '',
      sortTerm: 'name|asc',
      conditions: [],
      volunteerBoolean: false,
      bioWasteBoolean: false,
      costInvolvedBoolean: false,
      plotType: 'All',
      userInfo: {},
      indexTab: true,
      mapTab: false
    }

    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handlePlotType = this.handlePlotType.bind(this)
    this.handleVolunteerBoolean = this.handleVolunteerBoolean.bind(this)
    this.handleBioWasteBoolean = this.handleBioWasteBoolean.bind(this)
    this.handleCostInvolvedBoolean = this.handleCostInvolvedBoolean.bind(this)
    this.combineFiltersAndSort = this.combineFiltersAndSort.bind(this)
    this.calculateDistance = this.calculateDistance.bind(this)
    this.handleIndexTab = this.handleIndexTab.bind(this)
    this.handleMapTab = this.handleMapTab.bind(this)
  }

  componentDidMount() {
    axios.get('/api/plots')
      .then(res => this.setState({ allPlots: res.data, plotsToDisplay: res.data }))
  }

  handleSearchKeyUp(e){
    console.log(e.target.value)
    this.setState({
      searchTerm: e.target.value
    }, () => this.combineFiltersAndSort(this.state.allPlots))
  }
  handleSortChange(e){
    this.setState({ sortTerm: e.target.value }, () => this.combineFiltersAndSort(this.state.allPlots))
  }
  handleCostInvolvedBoolean(e) {
    this.setState({
      costInvolvedBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.allPlots))
  }
  handleVolunteerBoolean(e) {
    this.setState({
      volunteerBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.allPlots))
  }
  handleBioWasteBoolean(e) {
    this.setState({
      bioWasteBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.allPlots))
  }
  handlePlotType(e) {
    console.log(e.target.value)
    this.setState({
      plotType: e.target.value
    }, () => this.combineFiltersAndSort(this.state.allPlots))
  }
  handleIndexTab() {
    this.setState({
      indexTab: true,
      mapTab: false
    })
  }
  handleMapTab() {
    this.setState({
      indexTab: false,
      mapTab: true
    })
  }
  combineFiltersAndSort(filteredPlots) {
    let filteredByVolunteer
    let filteredByBioWaste
    let filteredByCostsInvolved
    let filteredByPlotType
    let filterBySearchText

    // Create filter based on Regular expression of the search term
    const re= new RegExp(this.state.searchTerm, 'i')

    if(!this.state.searchTerm) {
      filterBySearchText = this.state.allPlots
    } else {
      filterBySearchText = this.state.allPlots.filter(plot => re.test(plot.name))
    }

    if(this.state.plotType === 'All') {
      filteredByPlotType = this.state.allPlots
    } else {
      filteredByPlotType = this.state.allPlots.filter(plot => plot.plotType === this.state.plotType)

      console.log(this.state.plotType)
      console.log(filteredByPlotType)
    }

    if(this.state.costInvolvedBoolean) {
      filteredByCostsInvolved = this.state.plotsToDisplay.filter(plot => !plot.costInvolved)
      console.log(filteredByCostsInvolved)
    } else {
      filteredByCostsInvolved = this.state.allPlots
    }

    if(this.state.volunteerBoolean) {
      filteredByVolunteer = this.state.allPlots.filter(plot => plot.volunteer)
      console.log(filteredByVolunteer)
    } else {
      filteredByVolunteer = this.state.allPlots
    }

    if(this.state.bioWasteBoolean) {
      filteredByBioWaste = this.state.allPlots.filter(plot => plot.bioWasteAccepted)
      console.log(filteredByBioWaste)
    } else {
      filteredByBioWaste = this.state.allPlots
    }

    _.indexOf = _.findIndex
    filteredPlots = _.intersection(this.state.allPlots, filteredByVolunteer, filteredByBioWaste, filteredByCostsInvolved, filteredByPlotType, filterBySearchText)

    const [field, order] = this.state.sortTerm.split('|')
    const sortedPlots = _.orderBy(filteredPlots, [field], [order])
    console.log('sorted plts', sortedPlots)
    return this.setState({ plotsToDisplay: sortedPlots })
  }

  calculateDistance(plot) {
    const user = Auth.getUser()

    const lat1 = plot.latitude
    const lon1 = plot.longitude
    const lat2 = user.latitude
    const lon2 = user.longitude

    const earthRadius = 6371e3
    const φ1 = lat1 * (Math.PI / 180)
    const φ2 = lat2 * (Math.PI / 180)
    const Δφ = (lat2-lat1) * (Math.PI / 180)
    const Δλ = (lon2-lon1) * (Math.PI / 180)

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const d = earthRadius * c
    return Math.round( (d * 0.000621371) * 10 ) / 10
  }

  render() {
    if(!this.state.allPlots) return <h2 className="title is-2">Loading ...</h2>
    return(
      <section className="section background-test">
        <div className="container">
          <div className="box">
            <h2 className="title is-3 has-white-text">Find a plot</h2>
            <div className="field control has-icons-left">
              <span className="icon is-left">
                <i className="fas fa-search"></i>
              </span>
              <input className="input is-fullwidth" placeholder="search" onKeyUp={this.handleSearchKeyUp} />

            </div>

            <div className="field">
              <div className="select is-fullwidth">
                <select onChange={this.handleSortChange}>
                  <option value="name|asc">Name A-Z</option>
                  <option value="name|desc">Name Z-A</option>
                  <option value="averageRating|asc">Rated Lo-Hi</option>
                  <option value="averageRating|desc">Rated Hi-Lo</option>
                  <option value="numOfSlots|asc">Number of slots Lo-Hi</option>
                  <option value="numOfSlots|desc">Number of slots Hi-Lo</option>
                  <option value="costPerAnnum|asc">Cost Lo-Hi</option>
                  <option value="costPerAnnum|desc">Cost Hi-Lo</option>
                </select>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="checkbox has-text-white" >
                    <input type="checkbox"  className="checkboxRadio" value="costInvolved" onClick={this.handleCostInvolvedBoolean} />
                    No costs involved
                  </label>
                </div>
                <div className="field">
                  <label className="checkbox has-text-white" >
                    <input type="checkbox"  className="checkboxRadio" value="Volunteer" onClick={this.handleVolunteerBoolean} />
                    Volunteer opportunities
                  </label>
                </div>
                <div className="field">
                  <label className="checkbox has-text-white" >
                    <input type="checkbox"  className="checkboxRadio" value="bioWasteAccepted" onClick={this.handleBioWasteBoolean}/>
                    Bio-waste accepted
                  </label>
                </div>
              </div>
              <hr />
              <div className="column is-half">
                <div className="control">
                  <label className="radio has-text-white" >
                    <input type="radio" name="plotType" className="checkboxRadio" value="All" defaultChecked onClick={this.handlePlotType} />
                  All plot types
                  </label>
                </div>
                <div className="control">
                  <label className="radio has-text-white" >
                    <input type="radio" name="plotType"  className="checkboxRadio" value="Community Garden" onClick={this.handlePlotType} />
                    Community Garden
                  </label>
                </div>
                <div className="control">
                  <label className="radio has-text-white" >
                    <input type="radio" name="plotType"  className="checkboxRadio" value="Private Plot" onClick={this.handlePlotType} />
                    Share of private garden
                  </label>
                </div>
                <div className="control">
                  <label className="radio has-text-white" >
                    <input type="radio" name="plotType"  className="checkboxRadio" value="Allotment" onClick={this.handlePlotType}/>
                    Allotment
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="background-test">
            <div className="tabs">
              <ul>
                <li onClick={this.handleIndexTab}><a>By Index</a></li>
                <li onClick={this.handleMapTab}><a>By Map</a></li>
              </ul>
            </div>

            {this.state.mapTab && <PlotsMap plotsToDisplay={this.state.plotsToDisplay}/>}



            {this.state.indexTab && <div className="columns is-multiline">

              {!this.state.allPlots && <h2 className="title is-2">Loading ...</h2>}
              {this.state.plotsToDisplay && this.state.plotsToDisplay.map(plot =>
                <div className="column is-one-third-desktop" key={plot._id}>
                  <Link to={`/plots/${plot._id}`}>
                    <Card
                      name={truncate(plot.name, 30)}
                      plotType={plot.plotType}
                      image={plot.image}
                      averageRating={plot.averageRating}
                      postCode={plot.postCode}
                      distanceApart={this.calculateDistance(plot)}
                    />
                  </Link>
                </div>
              )}
            </div>}
          </div>
        </div>
      </section>
    )
  }
}

export default PlotsIndex
