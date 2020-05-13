// Youssef Selkani
// 2020

import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Feed from './routes/Feed'
import Details from './routes/Details'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount = () => {}

  render () {
    return (
      <Router>
        <Route path='/' exact render={() => <Feed {...this.state} />} />
        <Route path='/details' exact render={() => <Details {...this.state} />} />
      </Router>
    )
  }
}
