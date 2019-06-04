import React from 'react';
import axios from 'axios';
import { BrowserRouter , Route, Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css




class UserGroups extends React.Component  {

state = {groups: []}

componentDidMount = async () => {
  const token = localStorage.getItem('accessToken')
  const id = localStorage.getItem('user_id')
  const response = await axios({
    method: 'get',
    url: `http://localhost:8080/api/users/${id}/groups`,
    headers: {
         'Authorization':  `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
  })
  this.setState({groups: response.data})
}

submit = (id) => {
  console.log('id:',id);
  confirmAlert({
    title: 'Confirm to submit',
    message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => this.onButtonClick(id)
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  });
};

onButtonClick(id) {
  const token = localStorage.getItem('accessToken')
  const user_id = localStorage.getItem('user_id')
  axios.delete(`http://localhost:8080/api/groups/${id}/users/${user_id}`,{
    headers: {
         'Authorization':  `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
  })
  //window.location = '/groups'
}

  render() {
    return (
      <div>
        <Link className="ui inverted green button" to='/groups/new'>New</Link>
        <Link className="ui inverted blue button" to='/groups/join'>Join</Link>
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
                  <button className="ui inverted red button" onClick={() => this.submit(group.group_id)}>
                    Leave Group
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default UserGroups;
