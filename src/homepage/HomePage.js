import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return(
      <div>
        <div className={'home-display '}>
          <i className={`icon-left massive tasks icon`} />
          <h1>Task Managment</h1>
          <i className={`icon-right massive tasks icon`} />
        </div>

    </div>
    )
  }
}
// <div className={'button '}>
//   { localStorage.getItem('accessToken')  || <Link className="ui inverted green button" to="/signup">{"Sign Up"}</Link>}
// </div>
export default HomePage;
