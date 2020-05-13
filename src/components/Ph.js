// Youssef Selkani
// 2020

import React, { Component } from 'react'
import { Segment, Placeholder } from 'semantic-ui-react'
import '../App.css'

export default class Ph extends Component {
  render () {
    return (
      <Segment padded>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length='medium' />
            <Placeholder.Line length='short' />
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    )
  }
}
