import React, { Component } from 'react'
import axios from 'axios'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from '../utils/renderCurrency'
import '../css/overview.css'
import '../css/addnew.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

class EditGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.location.state.title,
            platform: this.props.location.state.platform,
            price: this.props.location.state.price,
            description: this.props.location.state.description,
            id: this.props.location.state.id,
            ownage: "",
            region: this.props.location.state.region,
            oldfilename: this.props.location.state.filename,
            ownageTrue: "",
            ownageFalse: "",
            ownagePreviewOk: "",
            ownagePreviewFalse: "",
            stars: "",
            file: null,
            preview: null,
            isActive: false,
            fileremoved: "false"
        };
    }


    componentDidMount = () => {
        this.handleImagePreview()
        this.handleOwnagePreview()
        this.handleStarsPreview()
    }
    handleShow = () => {
        this.setState({
            isActive: true
        })
    }
    handleShowSuccess = () => {
        this.setState({
            isActive: false
        })
    }
    handleTitlePreview = () => {
        if (this.state.title === "") {
            return ("Game Title")
        } else if (this.state.title) {
            return this.state.title
        }
    }
    handlePricePreview = () => {
        if (this.state.price === "") {
            return ("0,00")
        } else if (this.state.price) {
            return this.state.price
        }
    }
    handleOwnagePreview = () => {
        if (this.props.location.state.ownage === "true") {
            document.getElementById("ownage").checked = true;
            this.setState({ ownage: "true", ownageTrue: "I own this Game", ownagePreviewOk: <>&#10004;</> });
            this.handleShowSuccess()
        } else if (this.props.location.state.ownage === "false") {
            this.setState({ ownage: "false", ownageFalse: "I don´t own this Game", ownagePreviewFalse: <>&#x2715;</> });
            this.handleShow()
        }
    }

    handleStarsPreview = () => {
        if (this.props.location.state.stars === "1") {
            document.getElementById("1-star").checked = true;
            this.setState({ stars: "1"})
        } else if (this.props.location.state.stars === "2") {
            document.getElementById("2-stars").checked = true;
            this.setState({ stars: "2" })
        } else if (this.props.location.state.stars === "3") {
            document.getElementById("3-stars").checked = true;
            this.setState({ stars: "3" })
        } else if (this.props.location.state.stars === "4") {
            document.getElementById("4-stars").checked = true;
            this.setState({ stars: "4" })
        } else if (this.props.location.state.stars === "5") {
            document.getElementById("5-stars").checked = true;
            this.setState({ stars: "5" })
        }
    }

    handleImagePreview = () => {
        if (this.props.location.state.filename === "null") {
            this.setState({ preview: ImagePlaceholder })
        } else if (this.props.location.state.filename !== "null") {
            const imageurl = `${API_ENDPOINT}/uploads/${this.props.location.state.filename}`
            return this.setState({ preview: imageurl })
        }
    }

    removeImage = () => {
        document.getElementById("image").value = null;
        this.setState({ preview: ImagePlaceholder, fileremoved: "true" })
    }

    render() {

        return (


            <div id="contentpage">

                <form onSubmit={this.handleSubmit.bind(this)} method="POST" encType='multipart/form-data'>

                    <div className="contentContainerInputForm">
                        <div className="inputForm">
                            <div className="gamesPreview">

                                <div type="button" className="imgDelButton" onClick={() => this.removeImage()}>&#x2715;</div>
                              
                                <div className="imageWrapper" style={{ marginTop: '-25px' }}>
                                    
                                    <img src={this.state.preview} className="imagePreview" alt="" />

                                </div>
                                <div className="gameTitle">{this.handleTitlePreview()}</div>
                                <div className="bottomSection">
                                    <div className="gamePrice">{this.handlePricePreview()}&nbsp;<Rendercurrency /></div>
                                    {this.state.isActive ? <div className="ownagePreviewFalse">{this.state.ownagePreviewFalse}</div> :
                                        <div className="ownagePreviewOk">{this.state.ownagePreviewOk}</div>}
                                </div>
                            </div>
                            <label className='label' >
                                Region:
                <br />
                                <select
                                    list="regionlist"
                                    name="region"
                                    id="region"
                                    className="currencydropdown"
                                    value={this.state.region}
                                    onChange={this.handleChange.bind(this)}
                                    required
                                >
                                    <option>PAL</option>
                                    <option>NTSC</option>
                                    <option>NTSC-J</option>
                                    <option>NTSC-C</option>
                                </select>
                            </label>
                            <br />
                            <br />
                            <label className="label">
                                Description:
                 <br />
                                <textarea
                                    className="form-group-addgame"
                                    onChange={this.handleChange.bind(this)}
                                    id="description"
                                    value={this.state.description}
                                    type='text'
                                    rows='4'
                                    required

                                />
                            </label>
                        </div>


                        <div className="inputForm">

                            <label className="label">
                                Title:
                 <br />
                                <input
                                    className="form-group-addgame"
                                    onChange={this.handleChange.bind(this)}
                                    id="title"
                                    value={this.state.title}
                                    type='text'
                                    required

                                />
                            </label>
                            <br />
                            <label className="label">
                                Platform:
                 <br />
                                <input
                                    className="form-group-addgame"
                                    onChange={this.handleChange.bind(this)}
                                    id="platform"
                                    value={this.state.platform}
                                    type='text'
                                    required

                                />
                            </label>
                            <br />
                            <label className="label">
                                Price:
                 <br />
                                <input
                                    className="form-group-addgame"
                                    onChange={this.handleChange.bind(this)}
                                    id="price"
                                    value={this.state.price}
                                    type='text'
                                    required

                                />
                            </label>
                            <br />
                            <label className="label">
                                Rating:
                             <br />
                                <div className="star-rating" onChange={this.handleChange.bind(this)}>
                                    <input type="radio" id="5-stars" name="rating" value="5" />
                                    <label htmlFor="5-stars" className="star">&#9733;</label>
                                    <input type="radio" id="4-stars" name="rating" value="4" />
                                    <label htmlFor="4-stars" className="star">&#9733;</label>
                                    <input type="radio" id="3-stars" name="rating" value="3" />
                                    <label htmlFor="3-stars" className="star">&#9733;</label>
                                    <input type="radio" id="2-stars" name="rating" value="2" />
                                    <label htmlFor="2-stars" className="star">&#9733;</label>
                                    <input type="radio" id="1-star" name="rating" value="1" />
                                    <label htmlFor="1-star" className="star">&#9733;</label>
                                </div>
                            </label>
                            <br />
                            <label className="label">
                                Own:
                                <br />
                                <input
                                    onChange={this.handleChange.bind(this)}
                                    id="ownage"
                                    value={this.state.ownage}
                                    type='checkbox'
                                />
                            </label>

                            {this.state.isActive ? <div className="errorTextAddGame">{this.state.ownageFalse}</div> : <div className="successTextAddGame">{this.state.ownageTrue}</div>}


                            <br />
                            <label className="label">
                                Image:
                                <br />
                                <input
                                    id="image"
                                    type="file"
                                    name="file"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </label>

                            <br />
                            <br />
                            <button className="addButton">Update Game</button>

                        </div>
                    </div>
                </form>

            </div>
        )
    }

    handleChange(event) {
        const field = event.target.id;
        var checkBox = document.getElementById("ownage");

        if (field === "title") {
            this.setState({ title: event.target.value });
        } else if (field === "price") {
            this.setState({ price: event.target.value });
        } else if (field === "region") {
            this.setState({ region: event.target.value });
        } else if (field === "description") {
            this.setState({ description: event.target.value });
        } else if (field === "1-star") {
            this.setState({ stars: event.target.value });
        } else if (field === "2-stars") {
            this.setState({ stars: event.target.value });
        } else if (field === "3-stars") {
            this.setState({ stars: event.target.value });
        } else if (field === "4-stars") {
            this.setState({ stars: event.target.value });
        } else if (field === "5-stars") {
            this.setState({ stars: event.target.value });
        } else if (field === "platform") {
            this.setState({ platform: event.target.value });
        } else if (field === "image") {
            this.setState({ preview: URL.createObjectURL(event.target.files[0]), file: event.target.files[0] })
        } else if (checkBox.checked === true) {
            this.setState({ ownage: "true", ownageTrue: "I own this Game", ownagePreviewOk: <>&#10004;</> });
            this.handleShowSuccess()
        }  else {
            this.setState({ ownage: "false", ownageFalse: "I don´t own this Game", ownagePreviewFalse: <>&#x2715;</> });
            this.handleShow()
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        let data = new FormData();
        data.append('id', this.state.id);
        data.append('title', this.state.title);
        data.append('price', this.state.price);
        data.append('platform', this.state.platform);
        data.append('ownage', this.state.ownage);
        data.append('region', this.state.region);
        data.append('description', this.state.description);
        data.append('stars', this.state.stars);
        data.append('file', this.state.file);
        data.append('oldfilename', this.state.oldfilename);

        if (this.state.fileremoved === "true") {
            axios({
                method: "POST",
                withCredentials: true,
                credentials: 'include',
                url: `${API_ENDPOINT}/api/removeimage`,
                headers: { 'Content-Type': 'application/json' },
                data: {
                    id: this.state.id,
                    filename: "null",
                    oldfilename: this.props.location.state.filename

                }

            }).then((response, props) => {
                console.log(response)
                if (response.data.success) {
                    console.log("Successfully removed image");
                }
            });
        }
        
        axios({
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            url: `${API_ENDPOINT}/api/editgame`,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: data

        }).then((response, props) => {
            console.log(response)
            if (response.data.success) {
                console.log("Successfully edited data");
                window.location.replace("/overview");
            }
        });
    }
}

export default EditGame