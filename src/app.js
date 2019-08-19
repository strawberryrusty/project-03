import React from 'react'
import ReactDOM from 'react-dom'


import { HashRouter, Route, Switch } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'

import Home from './components/pages/Home'
import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'
//
import PlotsIndex from './components/plots/Index'
import PlotsShow from './components/plots/Show'
import PlotsEdit from './components/plots/Edit'
import PlotsNew from './components/plots/New'
import Register from './components/auth/Register'

import Login from './components/auth/Login'
import About from './components/pages/About'


// import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bulma'
import './style.scss'


class App extends React.Component {


  render(){
    return(
      <HashRouter>
        <Navbar />
        <Switch>
          <SecureRoute path="/plots/:id/edit" component={PlotsEdit} />
          <SecureRoute path="/plots/new" component={PlotsNew} />
          <Route path="/plots/:id" component={PlotsShow} />
          <Route path="/plots" component={PlotsIndex} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
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
