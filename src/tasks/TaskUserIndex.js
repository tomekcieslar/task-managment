import React from 'react';
import axios from 'axios';
import { BrowserRouter , Route, Link } from "react-router-dom";



class TaskUserIndex extends React.Component  {

state = {tasks: []}

componentDidMount = async () => {
  const token = localStorage.getItem('accessToken')
  const id = localStorage.getItem('user_id')
  console.log(token);
  const response = await axios({
    method: 'get',
    url: `http://localhost:8080/api/tasks/${id}/users`,
    headers: {
         'Authorization':  `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
  })
  this.setState({tasks: response.data})
}

statusSet = (props) => {
  if (props == 0){

    return 'In Progress'
  } else {
    return 'Done'
  }

}

  render() {
    console.log(this.state.tasks);
    return (
       <div>
         <table className="ui celled striped table">
           <thead><tr>
             <th>ID</th>
             <th>Title</th>
             <th>Description</th>
             <th>Status</th>
             <th>Deadline</th>
           </tr></thead>
           <tbody>
             {this.state.tasks.map(task => (
               <tr>
                 <td>{task.task_id}</td>
                 <td>{task.title}</td>
                 <td>{task.description}</td>
                 <td>{this.statusSet(task.status)}</td>
                 <td>{task.task_date}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
    )
  }
}

export default TaskUserIndex;
