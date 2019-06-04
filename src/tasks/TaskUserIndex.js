import React from 'react';
import axios from 'axios';
import { BrowserRouter , Route, Link } from "react-router-dom";
import { trimStart } from 'lodash'



class TaskUserIndex extends React.Component  {

state = {users: []}

componentDidMount = async () => {
  const token = localStorage.getItem('accessToken')
  const id = trimStart(window.location.pathname, 'tasks/' )
  const response = await axios({
    method: 'get',
    url: `http://localhost:8080/api/tasks/${id}`,
    headers: {
         'Authorization':  `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
  })
  this.setState({users: response.data})
}

  render() {
    console.log("users:", this.state.users);
    return (
       <div>
         <table className="ui celled striped table">
           <thead><tr>
             <th>ID</th>
             <th>Firstname</th>
             <th>Lastname</th>
             <th>Email</th>
           </tr></thead>
           <tbody>
             {this.state.users.map(user => (
               <tr>
                 <td>{user.user_id}</td>
                 <td>{user.firstname}</td>
                 <td>{user.lastname}</td>
                 <td>{user.email}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
    )

  }
}

export default TaskUserIndex;
