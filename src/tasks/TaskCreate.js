import React from 'react'
import axios from 'axios'
import {indexOf, without, filter} from 'lodash'
import { Redirect} from "react-router-dom";


class TaskCreate extends React.Component  {

  state = { title: '', group_id: {group_id: this.props.location.state.group}, description: '', task_date: '', users: [], checked_users: []}


  componentDidMount = async () => {
    const token = localStorage.getItem('accessToken')
    const id = this.props.location.state.group
    console.log(token);
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/api/groups/${id}/users`,
      headers: {
           'Authorization':  `Bearer ${token}`,
           'Content-Type': 'application/json'
         },
    })

    this.setState({users: response.data})
    console.log(this.state.users);
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


       axios({
         method: 'post',
         url: 'http://localhost:8080/api/tasks',
         data: JSON.stringify(formData),
         headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
       }).then( (response) => {
         console.log(response)
         window.location = `/groups/${this.state.group_id.group_id}`
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
    console.log(this.props.location.state.group);
    console.log(this.state.checked_users);
    return (
      <div>
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
            <input type="datetime-local" value={this.state.task_date} onChange={(e) => this.setState({task_date: e.target.value})}/>
          </div>
          <div className="field">
            {this.state.users.map((user) => (
              <div>
                <input type="checkbox"  onChange={(e) => this.handleResultChange(user.user_id, e.target.checked)}/>
                {user.email}
              </div>
            ))}
          </div>
          <button className="ui inverted green button" type="primary"size="large" >
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default TaskCreate;
