import React from 'react';
import axios from 'axios';
import { BrowserRouter , Route, Link } from "react-router-dom";



class GroupIndex extends React.Component  {

state = {groups: []}

componentDidMount = async () => {
  const token = localStorage.getItem('accessToken')
  console.log(token);
  const response = await axios({
    method: 'get',
    url: 'http://localhost:8080/api/groups',
    headers: {
         'Authorization':  `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
  })
  this.setState({groups: response.data})
}


  render() {
    return (
      <div>
        <Link className="ui inverted green button" to='groups/new'>New</Link>
        <table className="ui celled striped table">
          <thead><tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
          </tr></thead>
          <tbody>
            {this.state.groups.map(group => (
              <tr>
                <td>{group.group_id}</td>
                <td>{group.name}</td>
                <td>
                  <Link  className="ui inverted green button" to={`/groups/${group.group_id}`}>Show</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default GroupIndex;
