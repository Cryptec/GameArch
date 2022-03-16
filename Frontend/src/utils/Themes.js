import React, { Component } from 'react'
import axios from 'axios'

const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT

class Themes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            themes: [],
            theme: '',
        }
    }

async componentDidMount() {
    const response = await fetch(`${API_ENDPOINT}/api/settingsdata`, { credentials: 'include' })
    if (response.ok) {
        const themes = await response.json()
        this.setState({ themes })
        this.state.themes.map(actualtheme => {
        this.setState({ theme: actualtheme.theme })
        const root = document.querySelector(':root');
        return root.setAttribute('color-scheme', `${actualtheme.theme}`);
        })
    } else {
        console.error()
    }
}
    
getCurrentTheme = () => {
    let themestate = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this.setState({theme: themestate})
    console.log(themestate);
    return themestate
}

loadThemeLight = async () => {
    axios({
        method: "POST",
        withCredentials: true,
        credentials: 'include',
        url: `${API_ENDPOINT}/api/settheme`,
        headers: { 'Content-Type': 'application/json' },
        data: { theme: 'light', id: 1 }

    }).then((response, props) => {
        console.log(response)
        if (response.data.success) {
            console.log("Successfully changed");
            this.setState({ theme: 'light' })
            const root = document.querySelector(':root');
            root.setAttribute('color-scheme', `${this.state.theme}`);
  }}) 
}

loadThemeDark = async () => {
    axios({
        method: "POST",
        withCredentials: true,
        credentials: 'include',
        url: `${API_ENDPOINT}/api/settheme`,
        headers: { 'Content-Type': 'application/json' },
        data: { theme: 'dark', id: 1 }

    }).then((response, props) => {
        console.log(response)
        if (response.data.success) {
            console.log("Successfully changed");
            this.setState({ theme: 'dark' })
            const root = document.querySelector(':root');
            root.setAttribute('color-scheme', `${this.state.theme}`);
        }
    })
  }

toggleTheme = () => {
    const theme = this.state.theme
    if (theme === 'dark') {
        this.loadThemeLight();
    } else {
        this.loadThemeDark()
    }
}

    render() {

        return(
            
          <div>
          <button onClick={this.toggleTheme}>Apperance: {this.state.theme}</button>
          
          </div>

        )
    }
}

export default Themes