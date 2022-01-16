import React, { Component } from 'react'
import axios from 'axios'
import { GridIcon, ListIcon } from '../assets/icons/index.jsx'
import RenderDetailWishlist from '../utils/renderDetailWishlist'
import RenderListWishlist from '../utils/renderListWishlist'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Wishlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            settings: [],
            platform: "all games",
            view: "",
            count: 0,
            isActiveList: "false"
        }
    }

    async componentDidMount() {
        this.FetchView()
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
                        <option>Nintendo 64</option>
                        <option>PlayStation</option>
                    </select>
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

export default Wishlist