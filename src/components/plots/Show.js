import React from 'react'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component'
import ReactMapboxGl, { Marker, ZoomControl } from 'react-mapbox-gl'


const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN
})


import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'
import Comment from '../common/Comment'

class PlotsShow extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {
        rating: 1,
        content: ''
      }

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCommentDelete = this.handleCommentDelete.bind(this)
    this.handleStarClick = this.handleStarClick.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/plots/${this.props.match.params.id}`)
      .then(res => this.setState({ plot: res.data }))
  }

  handleStarClick(nextValue) {
    const formData = {...this.state.formData, rating: nextValue }
    this.setState({ formData })
  }

  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({ formData})
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/plots/${this.props.match.params.id}/comments`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ plot: res.data, formData: { rating: 1, content: ''} }))
  }

  handleDelete(){
    axios.delete(`/api/plots/${this.props.match.params.id}`,{
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(()=> this.props.history.push('/api/plots'))
  }

  handleCommentDelete(e){
    axios.delete(`/api/plots/${this.props.match.params.id}/comments/${e.target.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ plot: res.data }))
  }

  render() {
    console.log(this.state.plot)
    return (
      <section className="section">
        <div className="container">

          {!this.state.plot && <h2 className="title is-2">Loading...</h2>}

          {this.state.plot && <div>
            <header>
              <h1 className="title is-2">{this.state.plot.name}</h1>
              {Auth.isCurrentUser(this.state.plot.user) && <div className="buttons">
                <Link
                  className="button"
                  to={`/plots/${this.state.plot._id}/edit`}
                >Edit</Link>

                <button className="button is-danger"
                  onClick={this.handleDelete}>Delete</button>
              </div>}
            </header>
            <hr />
            <div className="columns is-multiline">
              <div className="column is-one-third">
                <img src={this.state.plot.image} alt={this.state.plot.name}/>
              </div>
              <div className="column is-one-third">
                <p>Plot Type: {this.state.plot.plotType}</p>
                <p>Facilities: {this.state.plot.facilities.map(thing => thing)}</p>
                <p>Number of Slots: {this.state.plot.numOfSlots}</p>
                <p>Bio Waste accepted? {this.state.bioWasteAccepted ? '✅' : '❌'}</p>
                <p>Costs involved? {this.state.plot.costInvolved ? '✅' : '❌'}</p>
                <p>Volunteers needed? {this.state.plot.volunteer ? '✅' : '❌'}</p>

                <div>
                  <p>Average rating:</p>
                  <StarRatingComponent
                    name="Average rating"
                    editing={false}
                    renderStarIcon={() => <span></span>}
                    starCount={5}
                    value={this.state.plot.averageRating}
                  />
                </div>
              </div>
              <div className="column is-one-third">
                <p> Name: {this.state.plot.primaryContactName}</p>
                <p> Email: {this.state.plot.primaryContactEmail}</p>
                <hr/>
                <h1>Address</h1>
                <p>{this.state.plot.streetAddress}</p>
                <p> {this.state.plot.postCode}</p>
              </div>
            </div>
            <hr/>

            <div>
              <h1> Description </h1>
              <p>{this.state.plot.description}</p>
            </div>

            <hr/>

            <div className="container">
              <h1 className="title is-4">Location</h1>
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                scrollZoom= {true}
                containerStyle={{
                  height: '40vh',
                  width: '100%'
                }}
                center={[this.state.plot.longitude, this.state.plot.latitude]}
              >
                <Marker
                  coordinates={[this.state.plot.longitude, this.state.plot.latitude]}
                >
                  <img src={'https://image.flaticon.com/icons/svg/135/135687.svg'}
                    height='50'
                    width='50'
                  />
                </Marker>
                <ZoomControl
                  isEnabled= 'true' />
              </Map>
            </div>

            <div className="column is-full">
              <div className="column is-full">
                {this.state.plot.comments.map(comment =>
                  <Comment key={comment._id} {...comment}
                    handleCommentDelete={this.handleCommentDelete} />
                )}
                {Auth.isAuthenticated() && <form onSubmit={this.handleSubmit}>

                  <hr />
                  <div className="field">
                    <label className="label">Comment</label>
                    <textarea
                      name="content"
                      className="textarea"
                      placeholder="Add a comment..."
                      onChange={this.handleChange}
                      value={this.state.formData.content}
                    />
                  </div>
                  <div>
                    <h2>Rating: {this.state.formData.rating}</h2>
                    <StarRatingComponent
                      name="rating"
                      renderStarIcon={() => <span></span>}
                      starCount={5}
                      onStarClick={this.handleStarClick}
                      value={this.state.formData.rating}
                    />
                  </div>
                  <button className="button is-info">Submit</button>
                </form>}
              </div>
            </div>

          </div>}

        </div>
      </section>
    )
  }
}

export default PlotsShow
