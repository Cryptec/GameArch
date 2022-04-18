import React, { Component } from 'react'
import axios from 'axios'
import { GridIcon, ListIcon, ShareIcon } from '../assets/icons/index.jsx'
import { openNav, closeNav } from '../components/handler'
import RenderDetailWishlist from '../utils/renderDetailWishlist'
import RenderListWishlist from '../utils/renderListWishlist'
import platforms from '../utils/platforms'

const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT || 'http://localhost:5000'
const SITE_URL = window._env_.REACT_APP_SITE_URL || 'http://localhost:3000'

class Wishlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            settings: [],
            sidebarState: localStorage.getItem('sidebar-collapsed'),
            platform: "all games",
            view: "",
            count: 0,
            successMessage: '',
            publiclink: '',
            isActiveList: "false"
        }
    }

    async componentDidMount() {
        this.state.sidebarState !== null ? closeNav() : openNav()
        this.setState({ publiclink: `${SITE_URL}/public/wishlist`})
        this.FetchView()
        this.getPlatforms()
    }

    async FetchView() {
        const response = await fetch(`${API_ENDPOINT}/api/settingsdata`, { credentials: 'include' })
        if (response.ok) {
            const settings = await response.json()
            this.setState({ settings })
            this.state.settings.map(setting => {
                this.setState({ isActiveList: setting.listview })
                this.handleDisplayType()
                return (true)
            })
        } else {
            console.log("error")
        }
    }

    handleSetList = () => {
        axios({
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            url: `${API_ENDPOINT}/api/setview`,
            headers: { 'Content-Type': 'application/json' },
            data: { view: "true", id: 1 }
        });
        this.setState({ isActiveList: "true" })
    }
    handleSetGrid = () => {
        axios({
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            url: `${API_ENDPOINT}/api/setview`,
            headers: { 'Content-Type': 'application/json' },
            data: { view: "false", id: 1 }
        });
        this.setState({ isActiveList: "false" })
    }

    handleDisplayType = () => {
        if (this.state.isActiveList === "true") {
            return <RenderListWishlist key={this.state.count }/>
        } else if (this.state.isActiveList === "false") {
            return <RenderDetailWishlist key={this.state.count }/>
        }
    }

getPlatforms = () => {
    var select = document.getElementById('platform'); 
    var options = platforms; 
    
    for(var i = 0; i < options.length; i++) {
      var opt = options[i];
  
      var el = document.createElement("option");
      el.text = opt;
      el.value = opt;
  
      select.add(el);
    }}

Publiclink = () => {
    navigator.clipboard.writeText(this.state.publiclink)
    this.setState({ successMessage: 'Public link copied to clipboard!', isActive: true })
    setTimeout(() => { this.setState({ isActive: false }) }, 3000);
}

    render() {

        return (

            <div id="contentpage">
                <div className="overviewContainer" style={{ marginBottom: "5px" }}>
                    <select
                        list='platformlist'
                        name='platform'
                        id='platform'
                        className='filterdropdown'
                        value={localStorage.getItem('filter')}
                        onChange={this.handleChange.bind(this)}
                        required
                    >
                        <option>all games</option>

                    </select>
                    <div style={styles.wishShareButton} onClick={() => this.Publiclink()}><ShareIcon /></div>
                    {this.state.isActive ? <div style={styles.wishShareMessage}>{this.state.successMessage}</div> : null}
                    <div className="girdViewButton" onClick={this.handleSetGrid}><GridIcon /></div>
                    <div className="listViewButton" onClick={this.handleSetList}><ListIcon /></div>
                </div>

                {this.handleDisplayType()}
            </div>
        )
    }

    handleChange(event) {
        const field = event.target.id

        if (field === 'platform') {

            if (event.target.value === 'all games') {
                this.setState({ platform: event.target.value, count: this.state.count + 1 })
                localStorage.setItem('filter', '')
            } else {
                this.setState({ platform: event.target.value, count: this.state.count + 1 })
                localStorage.setItem('filter', event.target.value);
            }
        }
    }
}

const styles = {};

styles.wishShareButton = {
    color: 'var(--text-primary)',
    paddingLeft: '15px',
    paddingTop: '5px',
    cursor: 'pointer'
}

styles.wishShareMessage = {
    padding: '3px',
    fontWeight:' 500',
    fontSize: 'medium',
    width: 'fit-content',
    borderRadius: '7px',
    color: 'green',
    marginLeft: '6px',
    display: 'flex',
    border:' 1px solid green',
}
export default Wishlist