import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'
import Comment from '../common/Comment'

class ShowPlots extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {
        rating: 1,
        content: ''
        // yesOrNo: 'No'
      }

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComment = this.handleCommentDelete.bind(this)

  }

  componentDidMount() {
    axios.get(`/api/plots/${this.props.match.params.id}`)
      .then(res => this.setState({ plot: res.data }))
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

  handleDelete(e){
    console.log(e.target)
    axios.delete(`/api/plots/${this.props.match.params.id}`,{
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(()=> this.props.history.push('/api/plots'))
  }

  handleCommentDelete(e){
    console.log(e.target.id)
    axios.delete(`/api/plots/${this.props.match.params.id}/comments/${e.target.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ plot: res.data }))
  }

  // decide() {
  //   if (bioWasteAccepted) this.state.yesOrNo = 'YES'
  //   else yesOrNo = 'No'
  // }


  render() {
    // console.log(this.state)
    return (
      <section className="section">
        <div className="container">

          {!this.state.plot && <h2 className="title is-2">Loading...</h2>}

          {this.state.plot && <div>
            <header>
              <h1 className="title is-2">{this.state.plot.name}</h1>
              {Auth.isAuthenticated() && <div className="buttons">
                <Link
                  className="button"
                  to={`/plots/${this.state.plot._id}/edit`}
                >Edit</Link>

                <button className="button is-danger"
                  onClick={this.handleDelete}>Delete</button>
              </div>}
              <hr />
            </header>
            <hr />
            <div className="columns">
              <div className="column">
                <img src={this.state.plot.image} alt={this.state.plot.name}/>
              </div>
              <div className="column">
                <p>Number of Slots:{this.state.plot.numOfSlots}</p>
                <p>Bio Waste accepted?{this.state.bioWasteAccepted ? '✅' : '❌'}</p>
                <p>Costs involved?{this.state.plot.costInvolved ? '✅' : '❌'}</p>
                <p>Volunteers needed?{this.state.plot.Volunteer ? '✅' : '❌'}</p>
              </div>
              <div className="column">
                <p> Name:{this.state.plot.primaryContactName}</p>
                <p> Email:{this.state.plot.primaryContactEmail}</p>
              </div>
              <div className="column">
                <h1> Address </h1>
                <p>{this.state.plot.streetAddress}</p>
                <p> {this.state.plot.postCode}</p>
              </div>
              <div className="column">
                {this.state.plot.comments.map(comment =>
                  <Comment key={comment._id} {...comment}
                    handleDeleteComment={this.handleDeleteComment} />
                )}


                {Auth.isAuthenticated() && <form onSubmit={this.handleSubmit}>
                  <hr />
                  <div className="field">
                    <label className="label">Comment</label>
                    <textarea
                      name = "content"
                      className="textarea"
                      placeholder="Add a comment..."
                      onChange={this.handleChange}
                      value={this.state.formData.content}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Rating (1-5)</label>
                    <input
                      name = "rating"
                      className="input"
                      type="range"
                      min="1"
                      max="5"
                      onChange ={this.handleChange}
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

export default ShowPlots
