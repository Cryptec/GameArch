import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from '../utils/renderCurrency'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

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
                    const id = game.id
                    const title = game.title
                    const price = game.price
                    const description = game.description
                    const region = game.region
                    const released = game.released
                    const ownage = game.ownage
                    const manual = game.manual
                    const box = game.box
                    const platform = game.platform
                    const wishlist = game.iswishlist
                    const stars = game.stars
                    const url = `${API_ENDPOINT}/uploads/${imageName}`

                    return (
                        <tr key={game.id}>
                            <Link to={{
                                pathname: `/gamedetail/${title}`,
                                state: {
                                    titlename: title,
                                    description: description,
                                    price: price,
                                    id: id,
                                    filename: imageName,
                                    platform: platform,
                                    region: region,
                                    released: released,
                                    ownage: ownage,
                                    manual: manual,
                                    box: box,
                                    wishlist: wishlist,
                                    stars: stars
                                }
                            }} >
                                <td>
                                    {imageName !== "null" ? <img src={`${url}`} alt="" style={styles.imagePreviewList} />
                                        : <img src={`${ImagePlaceholder}`} alt="" style={styles.imagePreviewList} />}
                                </td>

                            </Link>
                            <td><div style={styles.title}>{game.title}</div>
                                <br />
                                <div style={styles.platform}>{game.platform}</div>
                            </td>
                            <td>{game.ownage}</td>
                            <td><div style={styles.price}>{game.price}&nbsp;<Rendercurrency /></div></td>
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

styles.imagePreviewList = {
    maxWidth: '180px',
    width: 'auto',
    maxHeight: '120px',
    height: 'auto',
    alignSelf: 'center',
    marginTop: '12px',
    borderRadius: '5px'
}
styles.title = {
    fontWeight: '600'
}
styles.platform = {
    marginTop: '-50px'
}
styles.price = {
    padding: '7px',
    fontWeight: 600,
    width: 'fit-content',
    borderRadius: '7px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--hilight)',
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex'
}

export default RenderListWishlist