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
            view: "",
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
            return <RenderListWishlist />
        } else if (this.state.isActiveList === "false") {
            return <RenderDetailWishlist />
        }
    }

    render() {

        return (

            <div id="contentpage">
                <div className="overviewContainer" style={{ marginBottom: "5px" }}>
                    <div className="girdViewButton" onClick={this.handleSetGrid}><GridIcon /></div>
                    <div className="listViewButton" onClick={this.handleSetList}><ListIcon /></div>
                </div>

                {this.handleDisplayType()}
            </div>
        )
    }

}

export default Wishlist