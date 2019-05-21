import React from 'react';
import { BrowserRouter , Route, Link } from "react-router-dom";
import GroupCreate from './groups/GroupCreate';
import GroupIndex from './groups/GroupIndex';
import GroupShow from './groups/GroupShow';
import GroupUpdate from './groups/GroupUpdate';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';

class App extends React.Component {
  logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user_id')
    console.log(localStorage.getItem('accessToken'))
      window.location = '/signin'
  }
  render() {
    if (localStorage.getItem('accessToken')) {
      var button = 'Logout'
    } else {
      var button = 'Sign in'
    }
    return (
      <div>
        <BrowserRouter>
          <div className="ui secondary pointing menu">
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/groups">Groups</Link>
            <div className="right menu">
              <button className="ui item active" onClick={this.logout}>
                {button}
              </button>
            </div>
          </div>
          <Route path="/groups" exact component={GroupIndex} />
          <Route path="/groups/:id" exact component={GroupShow} />
          <Route path="/groups/:id/edit" exact component={GroupUpdate} />
          <Route path="/groups/new" exact component={GroupCreate} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
