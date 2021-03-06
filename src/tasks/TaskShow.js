import React from 'react'
import axios from 'axios'
import { trimStart } from 'lodash'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { BrowserRouter , Route, Link} from "react-router-dom";


class TaskShow extends React.Component  {
  state = {task: null, owner: null}

  componentDidMount = async () => {
    const token = localStorage.getItem('accessToken')
    const id = trimStart(window.location.pathname, 'tasks/' )
    console.log(token);
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/api/tasks/${id}`,
      headers: {
           'Authorization':  `Bearer ${token}`,
           'Content-Type': 'application/json'
         },
    })
    console.log(response.data);
    this.setState({task: response.data})
    if (this.state.task.group_id.owner.user_id == localStorage.getItem('user_id')  ) {
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

  onButtonClick() {
    const token = localStorage.getItem('accessToken')
    const id = trimStart(window.location.pathname, 'tasks/' )
    console.log(id);
    axios.delete(`http://localhost:8080/api/tasks/${id}`,{
      headers: {
           'Authorization':  `Bearer ${token}`,
           'Content-Type': 'application/json'
         },
    })
    window.location = '/tasks'
  }

  render () {
    console.log(this.state.owner);
    return (
      <div>
        {this.state.task && (
          <div>
            <table className="ui definition table">

            <tr>
              <td>Title:</td>
              <td>{this.state.task.title}</td>
            </tr>
            <tr>
            <td>Description:</td>
            <td>{this.state.task.description}</td>
            </tr>
            </table>
            <Link className="ui inverted purple button" to={{pathname: `/tasks/${this.state.task.task_id}/users`}}>Assigned Users</Link>
            {this.state.owner && (
              <button className="ui inverted red button" onClick={this.submit}>
                Delete Task
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default TaskShow;
