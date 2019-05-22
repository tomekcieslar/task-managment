import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class SignIn extends React.Component {
    state = {email: '', password: '', access: ''};

    onFormSubmit = (event) => {
      event.preventDefault();
      const formData = {
           email: this.state.email,
           password: this.state.password
         };
         console.log(JSON.stringify(formData));

         axios({
           method: 'post',
           url: 'http://localhost:8080/api/auth/signin',
           data: JSON.stringify(formData),
           headers: {
                'Content-Type': 'application/json'
              }
         }).then( (response) =>  {
           localStorage.setItem('accessToken', response.data.accessToken)
           localStorage.setItem('user_id', response.data.user.user_id)
           window.location = '/'
         });
         console.log(localStorage.getItem('accessToken'))
          console.log(localStorage.getItem('user_id'))
    }

    render() {
      return(
        <div>
          <h1>LOGIN</h1>
          <form className="ui form" onSubmit={this.onFormSubmit}>
            <div className="field">
              <label>Email</label>
              <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
            </div>
            <button className="ui inverted green button" type="primary"size="large">
              Sign In
            </button>
          </form>
          <Link to="/signup">{"Don't have account? Sign Up"}</Link>
        </div>
      );
    }
}

export default SignIn;
