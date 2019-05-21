import React from 'react'
import axios from 'axios'
import { trimStart, trimEnd } from 'lodash'

class GroupUpdate extends React.Component  {

  state = { name: '', owner_user_id: '', token: '' }

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
         this.props.history.push('/groups')
       } );
     }

  render () {
    return (
      <div>
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Name</label>
            <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
          </div>
          <div className="field">
            <label>Token</label>
            <input type="text" value={this.state.token} onChange={(e) => this.setState({token: e.target.value})}/>
          </div>
          <button className="ui button" type="primary"size="large" >
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default GroupUpdate;
