import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from '../utils/renderCurrency'

const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT

class RenderListWishlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: [],
            isLoading: false,
            isError: false,
            ownagePreviewOk: <>&#10004;</>,
            ownagePreviewFalse: <>&#x2715;</>,
            filter: localStorage.getItem('filter'),
            file: false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true, file: ImagePlaceholder })
        const response = await fetch(`${API_ENDPOINT}/api/wishlist/${this.state.filter}`, { credentials: 'include' })
        if (response.ok) {
            const games = await response.json()
            this.setState({ games, isLoading: false })
        } else {
            this.setState({ isError: true, isLoading: false })
        }
    }

    render() {

        return (

            <div className="userstable">
                <table id="tblData">
                    <tbody>
                        {this.renderTableRows()}
                    </tbody>
                </table>
            </div>
        )
    }


    renderTableRows = () => {
        const { games, isLoading, isError } = this.state

        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }

        return games.length > 0
            ? (
                this.state.games.map(game => {

                    const imageName = game.filename
                    const title = game.title
                    const url = `${API_ENDPOINT}/uploads/${imageName}`

                    return (
                        <tr key={game.id} style={{ display: 'flex', flexDirection: 'row' }}>
                            <Link to={{
                                pathname: `/gamedetail/${title}`}} >
                                <div>
                                    {imageName !== "null" ? <img src={`${url}`} alt="" loading='lazy' style={styles.imagePreviewList} />
                                        : <img src={`${ImagePlaceholder}`} alt="" style={styles.imagePreviewList} />}
                                </div>

                            </Link>
                            <div style={styles.container}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={styles.title}>{game.title}</div>
                                    <br />
                                    <div style={styles.platform}>{game.platform}</div>
                                    <br />
                                    <div style={styles.purchasedate}>{`(${game.purchasedate})`}</div>
                                </div>
                                <div style={{ marginLeft: 'auto' }}><div style={styles.price}>{game.price}&nbsp;<Rendercurrency /></div></div>
                            </div>
                        </tr>
                    )
                })
            ) : (
                <div style={{ color: 'var(--text-primary)' }}>
                    No games.
                </div>
            )
    }




}

const styles = {};
styles.container = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
}
styles.imagePreviewList = {
    maxWidth: '180px',
    width: 'auto',
    maxHeight: '120px',
    height: 'auto',
    alignSelf: 'center',
    margin: '10px 30px -5px 10px',
    borderRadius: '5px'
}
styles.title = {
    fontWeight: '700',
    fontSize: '1.2em',
    marginRight: '30px',
    marginTop: '10px'
}
styles.platform = {
    marginTop: '-50px'
}
styles.price = {
    padding: '7px',
    fontWeight: 600,
    borderRadius: '7px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--hilight)',
    justifyContent: 'center',
    display: 'flex',
    marginTop: '40px',
    marginRight: '30px'
}
styles.purchasedate = {
    marginTop: '-50px',
    opacity: '0.5'
}


export default RenderListWishlist