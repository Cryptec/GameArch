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
    const response = await fetch(`${API_ENDPOINT}/api/employees`, {credentials: 'include'})
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
          <thead>
           
              <th style={{ borderTopLeftRadius: "4px" }}>Name</th>
              <th>email</th>
              <th style={{ borderTopRightRadius: "4px" }}></th>
            
          </thead>
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
          <td className="sendMail" onClick={() => window.location.href = `mailto:${user.email}`}>&#9993; Contact </td>
        </tr>
      )
    })
  }


deleteTableRow = async (id) => {
    
  await fetch(`${API_ENDPOINT}/api/employee/${id}`, {method: 'DELETE'})
  const response = await fetch(`${API_ENDPOINT}/api/employees`)
  if (response.ok) {
    const users = await response.json()
    this.setState({ users, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
  }
}

export default Coworker