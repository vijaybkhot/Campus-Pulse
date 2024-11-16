import React from 'react';
import { ListGroup, Image } from 'react-bootstrap';
import defaultProfile from '../assets/profile_pic.png'

const users = [
  { id: 1, firstName: 'John', lastName: 'Doe', imageUrl: '' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', imageUrl: '' },
  { id: 3, firstName: 'Michael', lastName: 'Johnson', imageUrl: '' },
  { id: 4, firstName: 'Emily', lastName: 'Davis', imageUrl: '' },
  { id: 5, firstName: 'Chris', lastName: 'Brown', imageUrl: '' },
];

const ProfileListView = () => {
  return (
    <>
        <div className='mt-5'>
            <h3 className='color-red'>Find New Friends</h3>
        </div>
        <ListGroup variant="flush">
        {users.map((user) => (
            <ListGroup.Item key={user.id} className="d-flex align-items-center">
            <Image
                src={defaultProfile} roundedCircle style={{ width: '60px', height: '60px', marginRight: '15px' }}
            />
            <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{user.firstName} {user.lastName}</div>
                <div style={{ fontSize: '12px' }}>2nd year Masters Student</div>
            </div>
            </ListGroup.Item>
        ))}
        </ListGroup>
    </>
  );
};

export default ProfileListView;
