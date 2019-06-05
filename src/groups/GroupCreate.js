import React from 'react'
import axios from 'axios'
import { Redirect} from "react-router-dom";

class GroupCreate extends React.Component  {

  state = { name: '', owner_user_id: '', token: ''}

  onFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
         name: this.state.name,
         owner: { user_id: localStorage.getItem('user_id')},
         token: this.state.token
       };

       console.log(JSON.stringify(formData));
       const token = localStorage.getItem('accessToken')


       axios({
         method: 'post',
         url: 'http://localhost:8080/api/groups',
         data: JSON.stringify(formData),
         headers: {
              'Authorization':  `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
       }).then( (response) => {
         console.log(response)
         this.props.history.push('/groups')
         //return <Redirect to={`/groups/${response.data.group_id}`} />
       })
     }

  render () {
    return (
      <div className="ui container middle aligned center aligned grid">
        <div className="column ui segment" style={{marginTop: '1rem'}}>
          <h1>Create Group</h1>
          <form className="ui form" onSubmit={this.onFormSubmit}>
            <div className="field">
              <label>Name</label>
              <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
            </div>
            <div className="field">
              <label>Token</label>
              <input type="text" value={this.state.token} onChange={(e) => this.setState({token: e.target.value})}/>
            </div>
            <button className="ui inverted green button" type="primary"size="large" >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default GroupCreate;
