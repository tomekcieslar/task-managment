import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'



class SignUp extends React.Component {
  state = {firstname: '', lastname:'', email: '', password: ''};

  onFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
         firstname: this.state.firstname,
         lastname: this.state.lastname,
         email: this.state.email,
         password: this.state.password
       };
       console.log(JSON.stringify(formData));

       axios({
         method: 'post',
         url: 'http://localhost:8080/api/auth/signup',
         data: JSON.stringify(formData),
         headers: {
              'Content-Type': 'application/json'
            }
       }).then( (response) => window.location = '/');


    // fetch('http://localhost:8080/api/auth/signup',{
    //   mode: 'cors',
    //   method: 'POST',
    //   header: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json; charset=utf-8'
    //   },
    //   body: formData,
    //   to: JSON.stringify
    // }).then( (response) => console.log(response)
    // );
  }


  render() {
    return(
      <div>
        <h1>Signup</h1>
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
          <button className="ui inverted green button" type="primary"size="large">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
