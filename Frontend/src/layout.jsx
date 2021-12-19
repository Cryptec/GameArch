import React, { Component }from 'react'
import Routes from './routes'
import Sidebar from './components/sidebar'
import Topbar from './components/topbar'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

class Layout extends Component {

    async componentDidMount() {
        const response = await fetch(`${API_ENDPOINT}/api/settingsdata`, { credentials: 'include' })
        if (response.ok) {
            const themes = await response.json()
            themes.map(actualtheme => {
                const root = document.querySelector(':root');
                return root.setAttribute('color-scheme', `${actualtheme.theme}`);
            })
        } else {
            console.error()
        }
    }
render() {
    return (

            <div>
                <Sidebar/>
                <Topbar />
                <Routes />
            </div>
    
    );
}}

export default Layout;