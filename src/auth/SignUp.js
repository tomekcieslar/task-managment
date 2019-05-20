import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class SignUp extends React.Component {
  state = {firstname: '', lastname:'', email: '', password: ''};

  onFormSubmit = (event) => {
    event.preventDefault();
    const formData = ({
         firstname: this.state.firstname,
         lastname: this.state.lastname,
         email: this.state.email,
         password: this.state.password
       });

    fetch('http://localhost:8080/api/auth/signup',{
      method: 'post',
      header: {'Content-Type': 'application/json'},
      data: JSON.stringify(formData)
    });
  }

  render() {
    return(
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.onFormSubmit}>
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
            <input type="text" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
          </div>
          <button type="primary"size="large" className="signup-form-button">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
