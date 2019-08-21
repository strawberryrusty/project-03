import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import Auth from '../../lib/Auth'


const Card = (props) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{props.name}</div>
      </div>
      <div className="card-image">
        <figure className="image is-3by2">
          <img src={props.image} alt={props.name} />
        </figure>
      </div>
      <div className="card-content">
        <div>
          <StarRatingComponent
            name="rate2"
            editing={false}
            renderStarIcon={() => <span><i className="fas fa-carrot"></i></span>}
            starCount={5}
            starColor={'rgb(255,140,0)'}
            emptyStarColor={'rgb(192,192,192)'}
            value={props.averageRating}
          />
        </div>
        <p className="notes">{props.plotType}</p>
        <p className="notes">{props.postCode}</p>
        {Auth.isAuthenticated() && <p className="notes">Distance away: {props.distanceApart} miles</p>}
      </div>
    </div>
  )
}



export default Card
