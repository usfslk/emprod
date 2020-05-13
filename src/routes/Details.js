// Youssef Selkani
// 2020

import React, { Component } from 'react'
import '../App.css'
import { Label, Grid, Button, Placeholder } from 'semantic-ui-react'
import Img from 'react-image'

const LogoLoader = (
  <center>
    <Placeholder style={{ width: 80, height: 80 }}>
      <Placeholder image />
    </Placeholder>
  </center>
)

export default class Details extends Component {
  render () {
    let { company_name, website, industry, industry_category, description } = this.props
    return (
      <div>
        <div className='center mb'>
          <Img
            src={'//logo.clearbit.com/' + website + '?size=80&greyscale=true'}
            loader={LogoLoader}
            style={{
              width: 80,
              height: 80,
              resizeMode: 'contain'
            }}
            alt='company_logo'
          />
          <h2>{company_name}</h2>
        </div>
        <div className='center mtb'>
          <Button basic color='black' onClick={this.props.goBack}>
            Back
          </Button>
        </div>
        <Grid verticalAlign='middle' stackable relaxed stretched>
          <Grid.Column width='10'>
            <div className='mbs'>
              <p>{description}</p>
            </div>
            <a href={'https://' + website} target='_blank' rel='noopener noreferrer'>
              {website}
            </a>
          </Grid.Column>
          <Grid.Column width='6' textAlign='center'>
            <Label size='large'>
              <b>Industry:</b> {industry}
            </Label>
            {industry_category !== '' && <p className='mts'>{industry_category}</p>}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
