import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Switch } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'

import Home from './components/pages/Home'
import Navbar from './components/common/Navbar'
// import SecureRoute from './components/common/SecureRoute'
//
// import PlotsIndex from './components/plots/Index'
// import PlotsShow from './components/plots/Show'
// import PlotsEdit from './components/plots/Edit'
// import PlotsNew from './components/plots/New'
//
// import Register from './components/auth/Register'
import Login from './components/auth/Login'

// import 'react-toastify/dist/ReactToastify.css'
import 'bulma'
import './style.scss'

class App extends React.Component {

  render(){
    return(
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />

        </Switch>
      </HashRouter>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
