import React from 'react'
import axios from 'axios'
import { trimStart } from 'lodash'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { BrowserRouter , Route, Link} from "react-router-dom";


class TaskShow extends React.Component  {
  state = {task: null}

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
            <button className="ui inverted red button" onClick={this.submit}>
              Delete Task
            </button>
            <button className="ui inverted secondary button" onClick={()=>{ window.location = '/tasks'}}>
              Back
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TaskShow;
