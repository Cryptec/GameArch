import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isLogin, userName } from '../utils'
import { openNav, closeNav } from './handler'

import '../css/topbar.css'
import '../css/sidebar.css'

class Topbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: isLogin(),
            nav: true,
            user: ""
        }
    }
    
async componentDidMount() {
    await this.setState({user: userName()})
}

handleLogout = () => {
    logout()
    this.props.history.push('/login')
    this.setState({
    isLogin: false,
    nav: true,
    user: ""
    })
}

toggleOpen = () => {
    openNav()
    this.setState({nav: true})
}

toggleClose = () => {
    closeNav()
    this.setState({ nav: false })
}

toggleNav = () => {
    this.state.nav ? this.toggleClose() : this.toggleOpen();
}

    render() {

       const activeUser = this.state.user || 'undefined'

        return (
            <div className="topbar" id="topbar">
                <div className="sidebarbutton" onClick={this.toggleNav}>
                    &#9776;
                </div>
                
                <div className="topNavigation">
                   <li>
                    <Link to='/members' className="topNavigationItem">Users</Link>
                  </li>
                </div>
                <div className="authuser">   
                    Hello, {activeUser}
                </div>
                <div className="logoutbutton">
                    {this.state.isLogin ? (
                        <div onClick={() => this.handleLogout()}>Logout</div>
                    ) : (
                        <Link to='/login' onClick={() => this.handleLogout()}>
                            Logout
                        </Link>
                    )}
                </div>
    
            </div>
        )
    }
}

export default withRouter(Topbar)