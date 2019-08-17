import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Card from '../common/Card'

class PlotsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      searchTerm: '',
      sortTerm: 'name|asc',
      conditions: []
    }

    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    // this.applySort = this.applySort.bind(this)
    this.handleVolunteerBoolean = this.handleVolunteerBoolean.bind(this)
    this.handleBioWasteBoolean = this.handleBioWasteBoolean.bind(this)
    this.combineFiltersAndSort = this.combineFiltersAndSort.bind(this)
  }

  componentDidMount() {
    axios.get('/api/plots')
      .then(res => this.setState({ plots: res.data, plotsToDisplay: res.data }))
  }

  handleSearchKeyUp(e){
    console.log(e.target.value)
    const re= new RegExp(e.target.value, 'i')
    const filter =_.filter(this.state.plots, plot => {
      return re.test(plot.name)
    })
    this.setState({plotsToDisplay: filter}, () => this.combineFiltersAndSort(filter))

  }

  handleSortChange(e){
    this.setState({ sortTerm: e.target.value }, () => this.combineFiltersAndSort(this.state.plotsToDisplay))
  }

  handleVolunteerBoolean(e) {
    this.setState({
      // volunteer: e.target.value,
      volunteerBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.plotsToDisplay))
  }

  handleBioWasteBoolean(e) {
    this.setState({
      // bioWaste: e.target.value,
      bioWasteBoolean: e.target.checked
    }, () => this.combineFiltersAndSort(this.state.plotsToDisplay))
  }

  combineFiltersAndSort(filteredPlots) {

    let filteredByVolunteer
    let filteredByBioWaste


    if(this.state.volunteerBoolean) {
      filteredByVolunteer = this.state.plotsToDisplay.filter(plot => plot.Volunteer)
    }


    if(this.state.bioWasteBoolean) {
      filteredByBioWaste = this.state.plotsToDisplay.filter(plot => plot.bioWasteAccepted)
    }

    this.setState({ filteredByVolunteer: filteredByVolunteer, filteredByBioWaste: filteredByBioWaste})

    console.log(this.state.filteredByVolunteer, this.state.filteredByBioWaste)

    const newFilteredPlots = _.intersection(this.state.filteredByVolunteer, this.state.filteredByBioWaste)

    console.log(newFilteredPlots)

    const [field, order] = this.state.sortTerm.split('|')
    const sortedPlots = _.orderBy(filteredPlots, [field], [order])
    return this.setState({ plotsToDisplay: sortedPlots })
  }



  // applySort(filteredPlots) {
  //   const [field, order] = this.state.sortTerm.split('|')
  //   console.log(field, order)
  //   const sortedPlots = _.orderBy(filteredPlots, [field], [order])
  //   console.log('sorted plots:', sortedPlots)
  //   return this.setState({plotsToDisplay: sortedPlots})
  // }


  render() {
    console.log(this.state.plotsToDisplay)
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
                <option value="numSlots|asc">No. slots Lo-Hi</option>
                <option value="numSlots|desc">No. slots Hi-Lo</option>
                <option value="cost|asc">Cost Lo-Hi</option>
                <option value="cost|desc">Cost Hi-Lo</option>
              </select>
            </div>
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

          <div className="columns is-multiline">

            {!this.state.plots && <h2 className="title is-2">Loading ...</h2>}
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
