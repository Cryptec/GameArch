import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isLogin, userName } from '../utils'
import { openNav, closeNav } from './handler'

import '../css/topbar.css'
import '../css/sidebar.css'
import '../css/dropdown.css'


class Topbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: isLogin(),
            nav: true,
            user: "",
            open: false,
        }
    }
    
async componentDidMount() {
    await this.setState({user: userName()});
    document.addEventListener("mousedown", this.handleClickOutside);
}

componentWillUnmount() {
  document.removeEventListener("mousedown", this.handleClickOutside);
}

handleClickOutside = (event) => {
  if (
    this.container.current &&
    !this.container.current.contains(event.target)
  ) {
    this.setState({
      open: false,
    });
  }
};

handleDropdownClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
        };
    });
};

container = React.createRef();
state = {
  open: false,
};

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
                <div className="wrapper" ref={this.container} onClick={this.handleDropdownClick}>
                <div className="authuser">
                    Hello, <b>{activeUser}</b>
                </div>

                {this.state.open && (
                    <div class="dropdown">
                        <ul className="list">

                            <li className="list-item"> Settings </li>
                            <li className="list-item">
                                    {this.state.isLogin ? (
                                        <div onClick={() => this.handleLogout()}>Logout</div>
                                    ) : (
                                        <Link to='/login' onClick={() => this.handleLogout()}>
                                            Logout
                                        </Link>
                                    )}
                            </li>
                        </ul>
                    </div>
                )}
                </div>
    
            </div>
        )
    }
}

export default withRouter(Topbar)