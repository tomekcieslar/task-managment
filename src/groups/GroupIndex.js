import React from 'react'
import { BrowserRouter , Route, Link } from "react-router-dom";


const groups = [
  {group_id: 1, name: 'grupa1', owner_user_id: 1,token: '123'},
  {group_id: 2, name: 'grupa2', owner_user_id: 2,token: '234'},
  {group_id: 3, name: 'grupa3', owner_user_id: 3,token: '345'},
  {group_id: 4, name: 'grupa3', owner_user_id: 4,token: '456'}
]

class GroupIndex extends React.Component  {
  render() {
    return (
      <div>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
          {groups.map(group => (
            <tr>
              <td>{group.group_id}</td>
              <td>
                <Link to={`/groups/${group.group_id}`}>{group.name}</Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

export default GroupIndex;
