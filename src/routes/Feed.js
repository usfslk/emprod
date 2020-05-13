// Youssef Selkani
// 2020

import React, { Component } from 'react'
import '../App.css'
import { Container, Message, Card, Label, Icon, Loader } from 'semantic-ui-react'
import Ph from '../components/Ph'
import Details from '../routes/Details'
import Zipinput from '../components/Zipinput'
import usacodes from '../usacodes'

export default class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      feed: true,
      details: false,
      data: []
    }
    this.goBack = this.goBack.bind(this)
  }

  // on mount location permission check
  componentDidMount = () => {
    if (navigator.geolocation) {
      this.userPosition()
    } else {
      this.setState({ error: 'Location permission denied' })
    }
  }

  // retrieve user location from browser
  userPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var lat = position.coords.latitude
          var lng = position.coords.longitude
          this.setState(
            {
              lat: lat,
              lng: lng
            },
            () => {
              this.feedData(this.state.lat, this.state.lng)
            }
          )
        },
        (error) => this.setState({ error: error }),
        { maximumAge: 0, enableHighAccuracy: true, timeout: Infinity }
      )
    } else {
      this.setState({ error: 'Location not available. Please enter your zip code manually.' })
    }
  }

  handleDetails = (item, index) => {
    this.setState({
      feed: false,
      details: true,
      company_name: index.data.company_name,
      website: index.data.website,
      industry: index.data.industry,
      industry_category: index.data.industry_category,
      description: index.data.description,
      indexlat: index.data.lat,
      indexlng: index.data.lng
    })
  }

  goBack = (e) => {
    this.setState({ feed: true, details: false })
  }

  // zip text input function
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, edit: true })
  }
  userInput = (e) => {
    this.setState({ loading: true, feed: false, details: false })
    for (let x in usacodes) {
      if (usacodes[x].fields.zip === this.state.zipcode) {
        this.setState({ lat: usacodes[x].fields.latitude, lng: usacodes[x].fields.longitude }, () =>
          this.feedData()
        )
      } else {
        this.setState({ empty: true, loading: false })
      }
    }
  }

  // firebase data
  feedData = (e) => {
    this.setState({ loading: true })
    fetch('https://earthmoapi.herokuapp.com/api/v1/feed', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: this.state.lat,
        lng: this.state.lng
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.code === 200) {
          this.setState({
            data: json.data,
            empty: json.empty,
            loading: false,
            feed: true
          })
        } else if (json.code === 404) {
          console.log('code 404')
        }
      })
  }

  render () {
    let { loading, empty, error, feed, details } = this.state
    const items = this.state.data.map((item, index) => (
      <Card
        fluid
        key={index}
        link
        onClick={() => this.handleDetails(index, item)}
        className='center'>
        <Card.Content>
          <Card.Header>{item.data.company_name}</Card.Header>
          <div className='mtbs'>
            <Label size='large' fluid>
              {item.data.city}, {item.data.state}, {item.data.country}
            </Label>
          </div>
          <div style={{ color: '#000' }}>
            <p>{item.distance.toFixed(0)} miles</p>
          </div>
        </Card.Content>
        <Card.Content extra>
          <p>
            <Icon name='chart bar' />
            IA: {item.data.impact_area_environment}
          </p>
        </Card.Content>
      </Card>
    ))
    return (
      <Container className='master'>
        <div className='slave'>
          {feed && (
            <div className='mb'>
              <div className='center mb'>
                <h1>
                  <a href='/'>Earthmo</a>
                </h1>
              </div>
              <Zipinput
                {...this.state}
                handleChange={this.handleChange}
                userInput={this.userInput}
              />
            </div>
          )}
          {loading && (
            <div>
              <Ph />
              <Ph />
              <Ph />
              <Ph />
              <Ph />
            </div>
          )}
          {empty && !loading && (
            <p className='center mt'>No results found for this location! Please try again</p>
          )}
          {feed && !loading && (
            <div>
              {error && <Message fluid>Error: {error}</Message>}
              {items}
            </div>
          )}
          {details && <Details goBack={this.goBack} {...this.state} />}
        </div>
      </Container>
    )
  }
}
