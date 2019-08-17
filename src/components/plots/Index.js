import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const _ = require('lodash').runInContext()

import Card from '../common/Card'

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
      plotType: 'All'
    }

    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handlePlotType = this.handlePlotType.bind(this)
    this.handleVolunteerBoolean = this.handleVolunteerBoolean.bind(this)
    this.handleBioWasteBoolean = this.handleBioWasteBoolean.bind(this)
    this.handleCostInvolvedBoolean = this.handleCostInvolvedBoolean.bind(this)
    this.combineFiltersAndSort = this.combineFiltersAndSort.bind(this)
  }

  componentDidMount() {
    axios.get('/api/plots')
      .then(res => this.setState({ allPlots: res.data, plotsToDisplay: res.data }))
  }

  handleSearchKeyUp(e){
    console.log(e.target.value)
    this.setState({
      searchTerm: e.target.value
    }, () => this.combineFiltersAndSort(this.state.plotsToDisplay))
  }


  handleSortChange(e){
    this.setState({ sortTerm: e.target.value }, () => this.combineFiltersAndSort(this.state.plotsToDisplay))
  }

  handleCostInvolvedBoolean(e) {
    this.setState({
      costInvolvedBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.plotsToDisplay))
  }

  handleVolunteerBoolean(e) {
    this.setState({
      volunteerBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.plotsToDisplay))
  }

  handleBioWasteBoolean(e) {
    this.setState({
      bioWasteBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.plotsToDisplay))
  }

  handlePlotType(e) {
    console.log(e.target.value)
    this.setState({
      plotType: e.target.value
    }, () => this.combineFiltersAndSort(this.state.plotsToDisplay))
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
      filteredByPlotType = this.state.plotsToDisplay.filter(plot => plot.plotType === this.state.plotType)

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
      filteredByVolunteer = this.state.plotsToDisplay.filter(plot => plot.Volunteer)
      console.log(filteredByVolunteer)
    } else {
      filteredByVolunteer = this.state.allPlots
    }

    if(this.state.bioWasteBoolean) {
      filteredByBioWaste = this.state.plotsToDisplay.filter(plot => plot.bioWasteAccepted)
      console.log(filteredByBioWaste)
    } else {
      filteredByBioWaste = this.state.allPlots
    }

    //The lodash intersection function did not work at first because array of objects - this code works

    _.indexOf = _.findIndex
    filteredPlots = _.intersection(this.state.allPlots, filteredByVolunteer, filteredByBioWaste, filteredByCostsInvolved, filteredByPlotType, filterBySearchText)


    const [field, order] = this.state.sortTerm.split('|')
    const sortedPlots = _.orderBy(filteredPlots, [field], [order])
    return this.setState({ plotsToDisplay: sortedPlots })
  }



  render() {
    if(!this.state.allPlots) return <h2 className="title is-2">Loading ...</h2>
    return(
      <section className="section">
        <div className="container">
          <div className="field">
            <input className="input is-fullwidth" placeholder="search" onKeyUp={this.handleSearchKeyUp}/>
          </div>
          <div className="field">
            <div className="select is-fullwidth">
              <select onChange={this.handleSortChange}>
                <option value="name|asc">Name A-Z</option>
                <option value="name|desc">Name Z-A</option>
                <option value="numSlots|asc">Number of slots Lo-Hi</option>
                <option value="numSlots|desc">Number of slots Hi-Lo</option>
                <option value="cost|asc">Cost Lo-Hi</option>
                <option value="cost|desc">Cost Hi-Lo</option>
              </select>
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <div className="field">
                <label className="checkbox" >
                  <input type="checkbox" value="costInvolved" onClick={this.handleCostInvolvedBoolean} />
                  No costs involved
                </label>
              </div>
              <div className="field">
                <label className="checkbox" >
                  <input type="checkbox" value="Volunteer" onClick={this.handleVolunteerBoolean} />
                  Volunteer opportunities
                </label>
              </div>
              <div className="field">
                <label className="checkbox" >
                  <input type="checkbox" value="bioWasteAccepted" onClick={this.handleBioWasteBoolean}/>
                  Bio-waste accepted
                </label>
              </div>
            </div>
            <hr />
            <div className="column is-half">
              <div className="control">
                <label className="radio" >
                  <input type="radio" name="plotType" value="All" defaultChecked onClick={this.handlePlotType} />
                All plot types
                </label>
              </div>
              <div className="control">
                <label className="radio" >
                  <input type="radio" name="plotType" value="Community Garden" onClick={this.handlePlotType} />
                  Community Garden
                </label>
              </div>
              <div className="control">
                <label className="radio" >
                  <input type="radio" name="plotType" value="Private Plot" onClick={this.handlePlotType} />
                  Share of private garden
                </label>
              </div>
              <div className="control">
                <label className="radio" >
                  <input type="radio" name="plotType" value="Allotment" onClick={this.handlePlotType}/>
                  Allotment
                </label>
              </div>
            </div>
          </div>

          <div className="columns is-multiline">

            {!this.state.allPlots && <h2 className="title is-2">Loading ...</h2>}
            {this.state.plotsToDisplay && this.state.plotsToDisplay.map(plot =>
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
