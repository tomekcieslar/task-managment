import React from 'react';
import {Link} from 'react-router-dom';
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
        }).then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('user_id', response.data.user.user_id)
            window.location = '/'
        });
        console.log(localStorage.getItem('accessToken'))
        console.log(localStorage.getItem('user_id'))
    }

    render() {
        return (
            <div className="ui container middle aligned center aligned grid">
                <div className="column ui segment" style={{marginTop: '1rem'}}>
                    <h1>LOGIN</h1>
                    <form className="ui form" onSubmit={this.onFormSubmit}>
                        <div className="field">
                            <input type="text" placeholder="Email" value={this.state.email}
                                   onChange={(e) => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="field">
                            <input type="password" placeholder="Password" value={this.state.password}
                                   onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <button className="ui green button" type="primary" style={{width: '100%'}}>
                            Sign In
                        </button>
                    </form>
                    <div style={{marginTop: '15px'}}>Don't have account? <Link to="/signup">{"Sign Up"}</Link></div>
                </div>
            </div>
        );
    }
}

export default SignIn;
