import React from 'react'
import Bulma from 'bulma'

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{props.name}</div>
      </div>
      <div className="card-image">
        <figure><img className="image is-4by3" src={props.image}/>
        </figure>
      </div>
      <div className="card-content">
        <p className="notes">{props.diameterInKm}</p>
      </div>
    </div>
  )
}

export default Card
