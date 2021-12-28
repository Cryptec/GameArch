import React, { Component } from 'react'

import '../css/table.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Coworker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false
    }
  }


async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/users`, {credentials: 'include'})
    if (response.ok) {
      const users = await response.json()
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

render() {
    const { users, isLoading, isError } = this.state

    if (isLoading) {
      return <div id="contentpage">Loading...</div>
    }

    if (isError) {
      return <div id="contentpage">Error</div>
    }

    return users.length > 0
      ? (
        <div id="contentpage">
        <div className="userstable">
        <table id="tblData">
          
           
              <th style={{ borderTopLeftRadius: "4px" }}>name</th>
              <th>email</th>
              <th style={{ borderTopRightRadius: "4px" }}>delete </th>
            
       
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
        </div>
        </div>
      ) : (
        <div>
          No users.
      </div>
      )
  }

renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => 
    <th key={attr} >
    {attr}
    </th>)
  }

renderTableRows = () => {
    return this.state.users.map(user => {

      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td className="userDeleteButton" onClick={() => this.deleteTableRow(user.id)}> &#10005; </td>
        </tr>
      )
    })
  }


deleteTableRow = async (id) => {
    
  await fetch(`${API_ENDPOINT}/api/user/${id}`, { credentials: 'include', method: 'DELETE'})
  const response = await fetch(`${API_ENDPOINT}/api/users`, { credentials: 'include'})
  if (response.ok) {
    const users = await response.json()
    this.setState({ users, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
  }
}

export default Coworker