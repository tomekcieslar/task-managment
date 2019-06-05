import React from 'react'
import axios from 'axios'
import { trimStart, trimEnd } from 'lodash'

class GroupUpdate extends React.Component  {
  state = {
    name: this.props.group_props.location.state.group.name,
    owner_user_id: '',
    token: this.props.group_props.location.state.group.token
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
         name: this.state.name,
         owner: { user_id: localStorage.getItem('user_id')},
         token: this.state.token
       };

       console.log(JSON.stringify(formData));
       const token = localStorage.getItem('accessToken')
       var id = trimStart(window.location.pathname, 'groups/' )
       id = trimEnd(id , '/edit' )

       axios({
         method: 'put',
         url: `http://localhost:8080/api/groups/${id}`,
         data: JSON.stringify(formData),
         headers: {
              'Authorization':  `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
       }).then( (response) => {
         console.log(response)
         window.location = '/groups'
       } );
     }

  render () {
    console.log(this.props.group_props.location.state)
    return (
      <div className="ui container middle aligned center aligned grid">
        <div className="column ui segment" style={{marginTop: '1rem'}}>
          <h1>Edit Group</h1>
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
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default GroupUpdate;
