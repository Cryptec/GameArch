import React, { Component } from 'react'


class Themes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: '',
        }
    }

getCurrentTheme = () => {
    let themestate = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this.setState({theme: themestate})
    console.log(themestate);
    return themestate
}

loadTheme(){
    const root = document.querySelector(':root');
    root.setAttribute('color-scheme', 'light');
  }


    render() {

        return(
          <div>
          <button onClick={this.loadTheme}>{this.state.theme}</button>
          
          </div>

        )
    }
}

export default Themes