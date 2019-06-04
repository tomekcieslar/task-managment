import React from 'react'
import axios from 'axios'
import { trimStart } from 'lodash'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { BrowserRouter , Route, Link} from "react-router-dom";


class UserShow extends React.Component  {
  state = {user: null}

  componentDidMount = async () => {
    const token = localStorage.getItem('accessToken')
    const id = trimStart(window.location.pathname, 'users/' )
    console.log(token);
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/api/users/${id}`,
      headers: {
           'Authorization':  `Bearer ${token}`,
           'Content-Type': 'application/json'
         },
    })
    console.log(response.data);
    this.setState({user: response.data})
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

  onButtonClick() {
    const token = localStorage.getItem('accessToken')
    const id = trimStart(window.location.pathname, 'users/' )
    console.log(id);
    axios.delete(`http://localhost:8080/api/users/${id}`,{
      headers: {
           'Authorization':  `Bearer ${token}`,
           'Content-Type': 'application/json'
         },
    })
    window.location = '/'
    localStorage.removeItem('accessToken')
  }

  render () {
    return (
      <div>
        {this.state.user && (
          <div>
            <table className="ui definition table">
              <tr>
                <td>Firstname:</td>
                <td>{this.state.user.firstname}</td>
              </tr>
              <tr>
                <td>Lastname:</td>
                <td>{this.state.user.lastname}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{this.state.user.email}</td>
              </tr>
            </table>
            <Link className="ui inverted violet button" to={{pathname: `/users/${this.state.user.user_id}/edit`, state: {user: this.state.user}}}>Edit</Link>
            <button className="ui inverted red button" onClick={this.submit}>
              Delete Account
            </button>
            <button className="ui inverted secondary button" onClick={()=>{ window.location = '/'}}>
              Back
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default UserShow;
