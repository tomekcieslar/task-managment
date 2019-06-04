import React from 'react';
import axios from 'axios';
import { BrowserRouter , Route, Link } from "react-router-dom";
import { trimStart, map } from 'lodash'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



class UserTasks extends React.Component  {

state = {tasks: []}

componentDidMount = async () => {
  const token = localStorage.getItem('accessToken')
  const id = trimStart(window.location.pathname, 'users/' )
  console.log(id);
  const response = await axios({
    method: 'get',
    url: `http://localhost:8080/api/users/${id}`,
    headers: {
         'Authorization':  `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
  })
  console.log(response.data);
  this.setState({tasks: response.data})
}

statusSet = (props) => {
  if (props == 0){

    return 'In Progress'
  } else {
    return 'Done'
  }

}

submit = (task) => {
  confirmAlert({
    title: 'Confirm to submit',
    message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => this.onButtonClick(task)
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  });
};

onButtonClick(task) {
  console.log(task);
  if (task.status == 0) {
    var new_status = 1
  } else {
    var new_status = 0
  }
  const formData = {
       title: task.title,
       status: new_status,
       group_id: task.group_id,
       description: task.description,
       task_date: task.task_date,
       users: task.users
     };

     console.log(formData);
     const token = localStorage.getItem('accessToken')

  axios({
    method: 'put',
    url: `http://localhost:8080/api/tasks/${task.task_id}`,
    data: JSON.stringify(formData),
    headers: {
         'Authorization':  `Bearer ${token}`,
         'Content-Type': 'application/json'
       }
  }).then( (response) => {
    console.log(response)
    if (response.status === 200) {
      const newTask = Object.assign({}, task, {status: new_status})
      const updatedTasks = map(this.state.tasks, (task) => {
        if (task.task_id == newTask.task_id) {
          return newTask
        }
        return task
      })
      this.setState({ tasks: updatedTasks })
    } else {
      console.log(response);
    }

  });

}

  render() {
    return (
       <div className="ui container middle aligned center aligned grid">
         <table className="ui celled striped table">
           <thead><tr>
             <th>ID</th>
             <th>Title</th>
             <th>Description</th>
             <th>Status</th>
             <th>Deadline</th>
             <th></th>
           </tr></thead>
           <tbody>
             {this.state.tasks.map(task => (
               <tr>
                 <td>{task.task_id}</td>
                 <td>{task.title}</td>
                 <td>{task.description}</td>
                 <td>{this.statusSet(task.status)}</td>
                 <td>{new Date(task.task_date).toLocaleDateString()}  {new Date(task.task_date).toLocaleTimeString()}</td>
                 <td>
                  <Link className="ui inverted green button" to={`/tasks/${task.task_id}`}>Show</Link>
                  <button className="ui inverted violet button" onClick={() => this.submit(task)}>
                    Change Status
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

export default UserTasks;
