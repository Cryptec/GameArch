import React, { Component } from 'react'
import { GridIcon, ListIcon } from '../../assets/icons/index.jsx'
import platforms from '../../utils/platforms'
import RenderPublicListWishlist from './renderPublicListWishlist.js'
import RenderPublicDetailWishlist from './renderPublicDetailWishlist.js'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class PublicWishlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            settings: [],
            platform: "all games",
            view: "",
            count: 0
        }
    }

    async componentDidMount() {
        await this.FetchView()
        this.getPlatforms()
        this.handleDisplayType()
    }

    async FetchView() {
        if(localStorage.getItem('viewType') === null) {
        localStorage.setItem('viewType', 'Grid');
        } 
        if (localStorage.getItem('filter') === null) {
        localStorage.setItem('filter', '')
        }
        this.setState({ count: this.state.count + 1 })
    }

    handleSetList = () => {
        localStorage.setItem('viewType', 'List');
        this.handleDisplayType()
        this.setState({ count: this.state.count + 1 })
    }

    handleSetGrid = () => {
        localStorage.setItem('viewType', 'Grid');
        this.handleDisplayType()
        this.setState({ count: this.state.count + 1 })
    }

    handleDisplayType = () => {
        if (localStorage.getItem('viewType') === "List") {
            return <RenderPublicListWishlist key={this.state.count} />
        } else if (localStorage.getItem('viewType') === "Grid") {
            return <RenderPublicDetailWishlist key={this.state.count} />
        }
    }

    getPlatforms = () => {
        var select = document.getElementById('platform');
        var options = platforms;

        for (var i = 0; i < options.length; i++) {
            var opt = options[i];

            var el = document.createElement("option");
            el.text = opt;
            el.value = opt;

            select.add(el);
        }
    }

    render() {

        return (

            <div style={styles.contentpage}>
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
                    <div className="girdViewButton" onClick={this.handleSetGrid}><GridIcon /></div>
                    <div className="listViewButton" onClick={this.handleSetList}><ListIcon /></div>
                </div>
                <div style={styles.pagecontainer}>
                    {this.handleDisplayType()}
                </div>
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

styles.contentpage = {
    padding: '25px',
    backgroundColor: 'var(--background)'
}
styles.pagecontainer = {
    backgroundColor: 'var(--container-background)',
    border: 'var(--border)',
    padding: '10px',
    minHeight: 'calc(100vh - 125px)',
    borderRadius: '6px'
}

export default PublicWishlist