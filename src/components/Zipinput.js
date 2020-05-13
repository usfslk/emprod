// Youssef Selkani
// 2020

import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
import '../App.css'

export default class Zipinput extends Component {
  render () {
    return (
      <div className='mbs'>
        <Input
          size='small'
          action={
            <Button
              disabled={!this.props.edit}
              compact
              color='black'
              onClick={() => this.props.userInput()}
              content='Submit'
            />
          }
          label='ZIP code'
          placeholder='12345'
          fluid
          type='number'
          onChange={this.props.handleChange}
          name='zipcode'
          disabled={this.props.loading}
        />
      </div>
    )
  }
}
