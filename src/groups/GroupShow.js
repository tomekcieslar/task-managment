import React from 'react'
import axios from 'axios'
import { trimStart } from 'lodash'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { BrowserRouter , Route, Link} from "react-router-dom";


class GroupShow extends React.Component  {
  state = {group: null, owner: null}

  componentDidMount = async () => {
    const token = localStorage.getItem('accessToken')
    const id = trimStart(window.location.pathname, 'groups/' )
    console.log(token);
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/api/groups/${id}`,
      headers: {
           'Authorization':  `Bearer ${token}`,
           'Content-Type': 'application/json'
         },
    })
    console.log(response.data);
    this.setState({group: response.data})
    console.log(this.state.group.owner.user_id);
    if (this.state.group.owner.user_id == localStorage.getItem('user_id')) {
      this.setState({owner: true})
    }
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.onButtonClick()
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  click = () => {
    confirmAlert({
      title: 'Your Token',
      message: this.state.group.token,
      buttons: [
        {
          label: 'Ok'
        },
      ]
    });
  };

  onButtonClick() {
    const token = localStorage.getItem('accessToken')
    const id = trimStart(window.location.pathname, 'groups/' )
    axios.delete(`http://localhost:8080/api/groups/${id}`,{
      headers: {
           'Authorization':  `Bearer ${token}`,
           'Content-Type': 'application/json'
         },
    })
    window.location = '/groups'
  }

  render () {
    return (
      <div className="ui container" >
        {this.state.group && (
          <div>
            <table className="ui definition table">

            <tr>
              <td>Name:</td>
              <td>{this.state.group.name}</td>
            </tr>
            <tr>
            <td>Owner:</td>
            <td>{this.state.group.owner.firstname}
            {this.state.group.owner.lastname}</td>
            </tr>
            </table>
            <button className="ui inverted secondary button" onClick={()=>{ window.location = `/users/${localStorage.getItem('user_id')}/groups`}}>
              Back
            </button>
            <Link className="ui inverted blue button" to={{pathname: `/groups/${this.state.group.group_id}/users`, state: {group: this.state.group}}}>Show members</Link>
            <Link className="ui inverted orange button" to={{pathname: `/tasks/`, state: {group: this.state.group}}}>Show Tasks</Link>

            { this.state.owner && (
              <div>
                <Link className="ui inverted violet button" to={{pathname: `/groups/${this.state.group.group_id}/edit`, state: {group: this.state.group}}}>Edit</Link>
                <Link className="ui inverted green button" to={{pathname: '/tasks/new', state: {group: this.state.group.group_id}}}>Create Task</Link>
                <button className="ui inverted red button" onClick={this.submit}>
                  Delete Group
                </button>
                <button className="ui inverted yellow button" onClick={this.click}>
                  Show Token
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default GroupShow;
