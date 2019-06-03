import React from 'react';
import { BrowserRouter , Route, Link } from "react-router-dom";
import GroupCreate from './groups/GroupCreate';
import GroupIndex from './groups/GroupIndex';
import GroupShow from './groups/GroupShow';
import GroupUpdate from './groups/GroupUpdate';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import HomePage from './homepage/HomePage';
import TaskCreate from './tasks/TaskCreate'
import TaskIndex from './tasks/TaskIndex';
import TaskUserIndex from './tasks/TaskUserIndex';
import TaskUpdate from './tasks/TaskUpdate';
import TaskShow from './tasks/TaskShow';
import AddUser from './groups/AddUser'


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
          <Route path="/" exact component={HomePage} />
          <Route path="/groups" exact component={GroupIndex} />
          <Route path="/groups/:id" exact component={GroupShow} />
          <Route path="/groups/:id/edit" exact component={GroupUpdate} />
          <Route path="/groups/new" exact component={GroupCreate} />
          <Route path="/groups/join" exact component={AddUser} />
          <Route path="/tasks/new" exact component={TaskCreate} />
          <Route path="/tasks" exact component={TaskIndex} />
          <Route path="/tasks/:id/users" exact component={TaskUserIndex} />
          <Route path="/tasks/:id/edit" exact component={TaskUpdate} />
          <Route path="/tasks/:id" exact component={TaskShow} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </BrowserRouter>
      </div>
    );
  }
};

//<Link className="item" to={`/tasks/${localStorage.getItem('user_id')}/users`} >MyTasks</Link>
export default App;
