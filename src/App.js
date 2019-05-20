import React from 'react';
import { BrowserRouter , Route, Link } from "react-router-dom";
import GroupCreate from './groups/GroupCreate';
import GroupDelete from './groups/GroupDelete';
import GroupIndex from './groups/GroupIndex';
import GroupShow from './groups/GroupShow';
import SignUp from './auth/SignUp'

class App extends React.Component {
  render() {
    return (
      <div>
        Task managment
        <BrowserRouter>
          <div  className="container">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/groups">Groups</Link>
              </li>
            </ul>

            <Route path="/groups" exact component={GroupIndex} />
            <Route path="/groups/:id" exact component={GroupShow} />
            <Route path="/signup" exact component={SignUp} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
