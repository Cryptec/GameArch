import React, { Component } from 'react'

export default class Slogan extends Component {
    constructor(props) {
        super(props)

        this.state = {
            slogans: ['memories', 'games', 'values']
        }
    }

    render() {
          var i = 0

        return(
          <div className='slogan' style={{display: 'flex', justifyContent: 'center'}}>
            Archive&nbsp;<b>{this.state.slogans[i]}</b>
          </div>

        )
    }
}