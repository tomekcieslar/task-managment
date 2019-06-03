import React from 'react'
import axios from 'axios'
import { Redirect} from "react-router-dom";

class AddUser extends React.Component  {
  state = { token: '', user: {user_id: localStorage.getItem('user_id')} }

  onFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
         token: this.state.token,
         user: { user_id: localStorage.getItem('user_id')},
       };

       console.log(JSON.stringify(formData));
       const user_token = localStorage.getItem('accessToken')


       axios({
         method: 'post',
         url: 'http://localhost:8080/api/groups/token',
         data: JSON.stringify(formData),
         headers: {
              'Authorization':  `Bearer ${user_token}`,
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
      <div>
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Group Token</label>
            <input type="text" value={this.state.token} onChange={(e) => this.setState({token: e.target.value})}/>
          </div>
          <button className="ui inverted green button" type="primary"size="large" >
            Sign to Group
          </button>
        </form>
      </div>
    );
  }
}

export default AddUser
