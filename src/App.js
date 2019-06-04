import React from 'react';
import { BrowserRouter , Route, Link, Redirect } from "react-router-dom";
import GroupCreate from './groups/GroupCreate';
import GroupIndex from './groups/GroupIndex';
import GroupShow from './groups/GroupShow';
import GroupUsers from './groups/GroupUsers';
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
import UserShow from './user/UserShow'
import UserUpdate from './user/UserUpdate'
import UserTasks from './user/UserTasks'
import UserGroups from './user/UserGroups'

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
            <Link className="item" to={`/users/${localStorage.getItem('user_id')}`}>My Profile</Link>
            <Link className="item" to={`/users/${localStorage.getItem('user_id')}/tasks`} >My Tasks</Link>
            <Link className="item" to={`/users/${localStorage.getItem('user_id')}/groups`} >My Groups</Link>
            <div className="right menu">
              <button className="ui item active" onClick={this.logout}>
                {button}
              </button>
            </div>
          </div>

          <Route path="/" exact component={HomePage} />
          <Route path="/groups" exact  render={() => (
            localStorage.getItem('accessToken') ? (
              <GroupIndex/>
            ) : (
              <Redirect to="/signin"/>
            )
          )} />
          <Route path="/groups/:id" exact component={GroupShow} onEnter={this.requireAuth} />
          <Route path="/groups/:id/edit" exact  render={props => (
            localStorage.getItem('accessToken') ? (
              <GroupUpdate group_props={props}/>
            ) : (
              <Redirect to="/signin"/>
            )
          )} />
          <Route path="/groups/:id/users" exact  render={props => (
            localStorage.getItem('accessToken') ? (
              <GroupUsers group_props={props}/>
            ) : (
              <Redirect to="/signin"/>
            )
          )} />
          <Route path="/groups/new" exact component={GroupCreate} onEnter={this.requireAuth} />
          <Route path="/groups/join" exact component={AddUser} onEnter={this.requireAuth} />
          <Route path="/tasks/new" exact component={TaskCreate} onEnter={this.requireAuth} />
          <Route path="/tasks" exact  render={props => (
            localStorage.getItem('accessToken') ? (
              <TaskIndex group_props={props}/>
            ) : (
              <Redirect to="/signin"/>
            )
          )} />
          <Route path="/tasks/:id/users" exact component={TaskUserIndex} onEnter={this.requireAuth} />
          <Route path="/tasks/:id/edit" exact  render={props => (
            localStorage.getItem('accessToken') ? (
              <TaskUpdate task_props={props}/>
            ) : (
              <Redirect to="/signin"/>
            )
          )} />
          <Route path="/tasks/:id" exact component={TaskShow} onEnter={this.requireAuth} />
          <Route path="/users/:id" exact  render={() => (
            localStorage.getItem('accessToken') ? (
              <UserShow/>
            ) : (
              <Redirect to="/signin"/>
            )
          )} />
          <Route path="/users/:id/edit" exact  render={props => (
            localStorage.getItem('accessToken') ? (
              <UserUpdate user_props={props}/>
            ) : (
              <Redirect to="/signin"/>
            )
          )} />
          <Route path="/users/:id/tasks" exact  render={() => (
            localStorage.getItem('accessToken') ? (
              <UserTasks/>
            ) : (
              <Redirect to="/signin"/>
            )
          )} />
          <Route path="/users/:id/groups" exact  render={() => (
            localStorage.getItem('accessToken') ? (
              <UserGroups/>
            ) : (
              <Redirect to="/signin"/>
            )
          )} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
        </BrowserRouter>
      </div>
    );
  }
};

//<Link className="item" to={`/tasks/${localStorage.getItem('user_id')}/users`} >MyTasks</Link>
export default App;
