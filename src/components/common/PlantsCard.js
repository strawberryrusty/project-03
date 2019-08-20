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
          <p className="notes"> Germination: {props.germination} </p>
          <p className="notes"> Days Of Maturation: {props.daysOfMaturation} </p>
          <p className="notes"> Spacing: {props.spacing} </p>
          <p className="notes"> Sow under glass: {props.sowUnderGlass ? '✅' : '❌'} </p>
          <p className="notes"> Sow under direct sunlight : {props.sowUnderDirectSunlight ? '✅' : '❌'} </p>
          <p className="notes"> Seed period: {props.seedPeriod.map(month => month + ' ')} </p>
          <p className="notes"> Harvest period: {props.harvestPeriod.map(month => month + ' ')} </p>
          <p className="notes"> Destroyed by: {props.destroyedBy.map(pest => pest + ' ')} </p>
          <p className="notes"> Propagator: {props.propagator ? '✅' : '❌'} </p>
        </div>
      </div>
    </div>
  )
}




export default PlantsCard
