import React from 'react'

const PlantsCard = (props) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{props.name}</div>
      </div>
      <div className="card-image">
        <figure className="image">
          <img src={props.image} alt={props.name}/>
        </figure>
        <div className="card-content">
          <p> Germination: {props.germination} </p>
          <p> Days Of Maturation: {props.daysOfMaturation} </p>
          <p> Spacing: {props.spacing} </p>
          <p> Sow under glass: {props.sowUnderGlass ? '✅' : '❌'} </p>
          <p> Sow under direct sunlight : {props.sowUnderDirectSunlight ? '✅' : '❌'} </p>
          <p> Seed period: {props.seedPeriod.map(month => month + ' ')} </p>
          <p> Harvest period: {props.harvestPeriod.map(month => month + ' ')} </p>
          <p> Destroyed by: {props.destroyedBy.map(pest => pest + ' ')} </p>
          <p> Propogator: {props.propagator ? '✅' : '❌'} </p>
        </div>
      </div>
    </div>
  )
}




export default PlantsCard
