import React, { Component } from 'react';
import Rendercurrency from '../../utils/renderCurrency';
import ImagePlaceholder from '../../assets/imageplaceholder.png';

import '../../css/detailview.css';
import '../../css/imagemodal.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000';

class PublicDetailview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: [],
            imageName: '',
            price: '',
            purchasedate: '',
            description: '',
            region: '',
            released: '',
            ownage: '',
            platform: '',
            wishlist: '',
            url: '',
            gameTitle: '',
            wishstate: '',
            id: '',
            stars: '',
            file: '',
            filename: '',
            title: '',
            module: '',
            manual: '',
            isownage: '',
            ismanual: '',
            isbox: '',
            box: '',
            cib: ''
        };
    }

    async componentDidMount() {
        await this.fetchGame();
        this.RenderOwnageState();
    }

    fetchGame = async () => {
        this.setState({ file: ImagePlaceholder })
        const response = await fetch(`${API_ENDPOINT}/api/${this.props.match.params.objectid}/detail/${this.props.match.params.objecttitle}`, { credentials: 'include' })
        if (response.ok) {
            const game = await response.json()
            document.getElementById(`${game.stars}-stars`).checked = true;
            return this.setState({
                id: game.id,
                filename: game.filename,
                title: game.title,
                price: game.price,
                purchasedate: game.purchasedate,
                description: game.description,
                region: game.region,
                released: game.released,
                ownage: game.ownage,
                manual: game.manual,
                box: game.box,
                isownage: game.ownage,
                ismanual: game.manual,
                isbox: game.box,
                platform: game.platform,
                wishlist: game.iswishlist,
                stars: game.stars,
                gameTitle: game.title
            });
        } else {
            this.setState({ isError: true, isLoading: false })
        }
    };



    RenderOwnageState = () => {
        const ownage = this.state.ownage;
        const box = this.state.box;
        const manual = this.state.manual;

        if (ownage === 'true') {
            this.setState({ module: 'Module' });
        } else {
            this.setState({ module: '' });
        }
        if (box === 'true') {
            this.setState({ box: ', Box' });
            if (ownage === 'false') {
                this.setState({ box: 'Box' });
            }
        } else {
            this.setState({ box: '' });
        }
        if (manual === 'true') {
            this.setState({ manual: ', Manual' });
        } else {
            this.setState({ manual: '' });
        }
    };

    getModal = () => {
        var modal = document.getElementById("myModal");
    
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var modalImg = document.getElementById("img01");
        const url = `${API_ENDPOINT}/uploads/${this.state.filename}`
    
          modal.style.display = "block";
          modalImg.src = `${url}`;
        
      }
    
      closeModal = () => {
        // When the user clicks on <span> (x), close the modal
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
      }

    render() {

        const url = `${API_ENDPOINT}/uploads/${this.state.filename}`
        const currency = <Rendercurrency />;

        return (
            <>
                {this.props.match.params.objecttitle ? (
                    <div style={styles.contentpage}>
                        <div style={styles.pagecontainer}>
                            <div className='HeaderContainer'>
                                <div className='imageWrapperDetail'>
                                    {this.state.filename !== 'null' ? (
                                        <img src={`${url}`} alt='' id='gameImg' onClick={this.getModal} />
                                    ) : (
                                        <img
                                            src={`${ImagePlaceholder}`}
                                            alt=''
                                            className='imagePreviewDetail'
                                        />
                                    )}
                                </div>
                                <div id="myModal" className="modal">
                                  <span className="close" onClick={this.closeModal}>&times;</span>
                                  <img className="modal-content" alt='modal-content' id="img01" />
                                </div>

                                <div style={{ flexDirection: 'column' }}>
                                    <div style={{ marginLeft: '35px' }}>
                                        <div className='gametitledetail'>
                                            {this.state.title}&nbsp;&nbsp;
                  </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <div className='star-rating-detail'>
                                                <input
                                                    type='radio'
                                                    id='5-stars'
                                                    name='rating'
                                                    value='5'
                                                />
                                                <label htmlFor='5-stars' className='star-detail'>
                                                    &#9733;
                      </label>
                                                <input
                                                    type='radio'
                                                    id='4-stars'
                                                    name='rating'
                                                    value='4'
                                                />
                                                <label htmlFor='4-stars' className='star-detail'>
                                                    &#9733;
                      </label>
                                                <input
                                                    type='radio'
                                                    id='3-stars'
                                                    name='rating'
                                                    value='3'
                                                />
                                                <label htmlFor='3-stars' className='star-detail'>
                                                    &#9733;
                      </label>
                                                <input
                                                    type='radio'
                                                    id='2-stars'
                                                    name='rating'
                                                    value='2'
                                                />
                                                <label htmlFor='2-stars' className='star-detail'>
                                                    &#9733;
                      </label>
                                                <input
                                                    type='radio'
                                                    id='1-stars'
                                                    name='rating'
                                                    value='1'
                                                />
                                                <label htmlFor='1-stars' className='star-detail'>
                                                    &#9733;
                      </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginTop: '-14px',
                                        }}
                                    >
                                        <h4
                                            style={{
                                                color: 'var(--text-primary)',
                                                marginLeft: '40px',
                                            }}
                                        >
                                            {this.state.platform}
                                        </h4>
                                        <h4 style={{ color: 'var(--text-primary)' }}>
                                            &nbsp;({this.state.released})
                  </h4>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className='descriptionContainer'>
                                <div style={{ color: 'var(--text-primary)' }}>
                                    {this.state.description}
                                </div>
                                <br />
                            </div>
                            <div
                                className='BodyContainer'
                            >
                                <br />
                                <div className='BodyContainerContentWraper'>
                                    <div className='detailtable'>
                                        <tbody id='detailtblData'>
                                            <tr>
                                                <td className='tdTitle'>In possession:</td>
                                                <td className='tdContent'>
                                                    {this.state.module}
                                                    {this.state.box}
                                                    {this.state.manual}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='tdTitle'>Region:</td>
                                                <td className='tdContent'>{this.state.region}</td>
                                            </tr>
                                            <tr>
                                                <td className='tdTitle'>Purchasedate:</td>
                                                <td className='tdContent'>{this.state.purchasedate}</td>
                                            </tr>
                                            <tr>
                                                <td className='tdTitle'>Price:</td>
                                                <td className='tdContent'>
                                                    <div style={{ display: 'inline-flex' }}>{this.state.price}&nbsp;{currency}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody id='detailtblData'>
                                            <tr>
                                                <td className='tdTitle'>Platform:</td>
                                                <td className='tdContent'>
                                                    {this.state.platform}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='tdTitle'>Rating:</td>
                                                <td className='tdContent'>{this.state.stars}/5</td>
                                            </tr>
                                            <tr>
                                                <td className='tdTitle'>Released:</td>
                                                <td className='tdContent'>{this.state.released}</td>
                                            </tr>
                                            <tr>
                                                <td className='tdTitle'>Wishlist:</td>
                                                <td className='tdContent'>
                                                    {this.state.wishlist === 'true' ? '✔' : '✖'}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>
                ) : (
                    <div id='contentpage'>
                        <div className='overviewContainer'>
                            <h3 style={{ color: 'var(--text-primary)' }}>No Game Selected</h3>
                        </div>
                    </div>
                )}
            </>
        )

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
    minHeight: 'calc(100vh - 70px)',
    borderRadius: '6px'
}

export default PublicDetailview;