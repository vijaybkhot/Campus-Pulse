import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FindFriends = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className="find-friends">
      <ul>
        {users.map(user => (
          <li key={user._id} className="friend-item">
            <img className="friend-avatar" src={user.avatar} alt={user.name} />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindFriends;
