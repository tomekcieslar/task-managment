import React from 'react'

const group = {group_id: 1, name: 'grupa1', owner_user_id: 1,token: '123'}
class GroupShow extends React.Component  {
  render () {
    return (
      <div>
        {group.name}
      </div>
    );
  }
}

export default GroupShow;
