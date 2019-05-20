import React from 'react'

class GroupCreate extends React.Component  {
  render () {
    return (
      <div>
        <form>
          <div className="field">
            <label>Firstname</label>
            <input type="text" value={this.state.firstname} onChange={(e) => this.setState({firstname: e.target.value})}/>
          </div>
        </form>
      </div>
    );
  }
}

export default GroupCreate;
