import React from 'react'
import axios from 'axios'


class PlantsIndex extends React.Component {
  constructor(){

    super()
    this.state={}
  }


  componentDidMount() {
    axios.get('/api/plants')
      .then(res => this.setState({ Plants: res.data}))
  }

  render() {
    return (
      <h1>Hello World!</h1>
    )
  }
}


export default PlantsIndex
