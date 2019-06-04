import React from 'react';
import axios from 'axios';
import { BrowserRouter , Route, Link } from "react-router-dom";
import { trimStart } from 'lodash'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



class GroupUsers extends React.Component  {

state = {users: [], owner: null}

componentDidMount = async () => {
  const token = localStorage.getItem('accessToken')
  const id = trimStart(window.location.pathname, 'groups/' )
  console.log(id);
  const response = await axios({
    method: 'get',
    url: `http://localhost:8080/api/groups/${id}`,
    headers: {
         'Authorization':  `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
  })
  console.log(response.data);
  this.setState({users: response.data})
  if (this.props.group_props.location.state.group.owner.user_id == localStorage.getItem('user_id')) {
    this.setState({owner: true})
  }
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
  const group_id = this.props.group_props.location.state.group.group_id
  axios.delete(`http://localhost:8080/api/groups/${group_id}/users/${id}`,{
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
         <table className="ui celled striped table">
           <thead><tr>
             <th>ID</th>
             <th>Firstname</th>
             <th>Lastname</th>
             <th>Email</th>
             <th></th>
           </tr></thead>
           <tbody>
             {this.state.users.map(user => (
               <tr>
                 <td>{user.user_id}</td>
                 <td>{user.firstname}</td>
                 <td>{user.lastname}</td>
                 <td>{user.email}</td>
                 <td>
                 { this.state.owner && (
                   <div>
                     <button className="ui inverted red button" onClick={() => this.submit(user.user_id)}>
                       Remove Member
                     </button>
                   </div>
                 )}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
         <button className="ui inverted secondary button" onClick={()=>{ window.location = `/groups/${this.props.group_props.location.state.group.group_id}`}}>
           Back
         </button>
       </div>
    )
  }
}

export default GroupUsers;
