import React from 'react'
import axios from 'axios'
import { Redirect} from "react-router-dom";
import {indexOf, without, filter} from 'lodash'

class TaskUpdate extends React.Component  {

  state = {
    title: this.props.task_props.location.state.task.title,
    group_id: {group_id: this.props.task_props.location.state.task.group_id.group_id},
    description: this.props.task_props.location.state.task.description,
    task_date: this.props.task_props.location.state.task.task_date,
    users: [],
    checked_users: [],
   }

   componentDidMount = async () => {
     const token = localStorage.getItem('accessToken')
     const group_id = this.props.task_props.location.state.task.group_id.group_id
     console.log(token);
     const response = await axios({
       method: 'get',
       url: `http://localhost:8080/api/groups/${group_id}/users`,
       headers: {
            'Authorization':  `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
     })
     this.setState({users: response.data})
   }

  onFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
         group_id: this.state.group_id,
         task_date: this.state.task_date,
         title: this.state.title,
         description: this.state.description,
         users: this.state.checked_users
       };

       console.log(JSON.stringify(formData));
       const token = localStorage.getItem('accessToken')
       const id = this.props.task_props.location.state.task.task_id

       axios({
         method: 'put',
         url: `http://localhost:8080/api/tasks/${id}`,
         data: JSON.stringify(formData),
         headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
       }).then( (response) => {
         console.log(response)
          window.location = '/tasks'
       }).catch ((err) => {
         console.log(err)
       })
     }

   handleResultChange = (user_id, checked) => {
     console.log(user_id);
     let cu = [...this.state.checked_users]
     if (checked) {
       cu.push({user_id: user_id})
     } else {
       cu = filter(cu, (user) => user.user_id !== user_id)
   }
   this.setState({ checked_users: cu })
  }

  render () {
    console.log('USERS:', this.state.checked_users);
    return (
      <div className="ui container middle aligned center aligned grid">
        <div className="column ui segment" style={{marginTop: '1rem'}}>
          <h1>Create Task</h1>
          <form className="ui form" onSubmit={this.onFormSubmit}>
            <div className="field">
              <label>Title</label>
              <input type="text" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
            </div>
            <div className="field">
              <label>Description</label>
              <input type="text" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}/>
            </div>
            <div className="field">
              <label>Task Date</label>
              <input type="datetime-local" value={Date(this.state.task_date)} onChange={(e) => this.setState({task_date: e.target.value})}/>
            </div>
            <div className="field">
              {this.state.users.map((user) => (
                <div className="ui checkbox">
                  <input type="checkbox"  onChange={(e) => this.handleResultChange(user.user_id, e.target.checked)}/>
                  <label>{user.email}</label>
                </div>
              ))}
            </div>
            <button className="ui inverted green button" type="primary"size="large" >
              Update
            </button>
          </form>
        </div>  
      </div>
    );
  }
}

export default TaskUpdate;
