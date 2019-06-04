import React from 'react';
import axios from 'axios';
import { BrowserRouter , Route, Link } from "react-router-dom";
import {indexOf, without, filter} from 'lodash'



class TaskIndex extends React.Component  {

state = {tasks: [], owner: null}

componentDidMount = async () => {
  const token = localStorage.getItem('accessToken')
  console.log(token);
  const response = await axios({
    method: 'get',
    url: 'http://localhost:8080/api/tasks',
    headers: {
         'Authorization':  `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
  })
  let task = filter(response.data, (t) => t.group_id.group_id === this.props.group_props.location.state.group.group_id)

  this.setState({tasks: task})
  if (this.props.group_props.location.state.group.owner.user_id == localStorage.getItem('user_id')  ) {
    this.setState({owner: true})
  }
}

statusSet = (props) => {
  if (props == 0){

    return 'In Progress'
  } else {
    return 'Done'
  }

}

  render() {
    return (
       <div>
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
                 <td>{task.task_date}</td>
                 <td>
                  <Link className="ui inverted green button" to={`/tasks/${task.task_id}`}>Show</Link>
                  {this.state.owner && (
                    <Link className="ui inverted purple button" to={{pathname: `/tasks/${task.task_id}/edit`, state: {task: task}}}>Edit</Link>
                  )}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
    )
  }
}

export default TaskIndex;
