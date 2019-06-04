import React from 'react'
import axios from 'axios'
import { trimStart, trimEnd } from 'lodash'

class UserUpdate extends React.Component  {
  state = {
    firstname: this.props.user_props.location.state.user.firstname,
    lastname: this.props.user_props.location.state.user.lastname,
    email: this.props.user_props.location.state.user.email,
    password: '',
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
         firstname: this.state.firstname,
         lastname: this.statelastname,
         email: this.state.email,
         password: this.state.password
       };

       console.log(JSON.stringify(formData));
       const token = localStorage.getItem('accessToken')
       var id = trimStart(window.location.pathname, 'users/' )
       id = trimEnd(id , '/edit' )

       axios({
         method: 'put',
         url: `http://localhost:8080/api/users/${id}`,
         data: JSON.stringify(formData),
         headers: {
              'Authorization':  `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
       }).then( (response) => {
         console.log(response)
         this.props.history.push(`/users/${id}`)
       } );
     }

  render () {
    console.log(this.props.user_props.location.state)
    return (
      <div>
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Firstname</label>
            <input type="text" value={this.state.firstname} onChange={(e) => this.setState({firstname: e.target.value})}/>
          </div>
          <div className="field">
            <label>Lastname</label>
            <input type="text" value={this.state.lastname} onChange={(e) => this.setState({lastname: e.target.value})}/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
          </div>
          <button className="ui inverted green button" type="primary"size="large" >
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default UserUpdate;
