import React from 'react'
import axios from 'axios'
import { Redirect} from "react-router-dom";

class TaskCreate extends React.Component  {

  state = { title: '', group_id: {group_id: this.props.location.state.group}, description: '', task_date: ''}

  onFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
         group_id: this.state.group_id,
         task_date: this.state.task_date,
         title: this.state.title,
         description: this.state.description
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
         this.props.history.push('/tasks')
       }).catch ((err) => {
         console.log(err)
       })
     }

  render () {
    console.log(this.props.location.state.group);
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
          <button className="ui inverted green button" type="primary"size="large" >
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default TaskCreate;
