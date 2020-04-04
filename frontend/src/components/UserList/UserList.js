import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import './UserList.css';

const UserList = ({ users }) => {
    return (
        <div className="userList">
            <div>
                <h1>Chat Application <span role="img" aria-label="emoji">💬</span></h1>
            </div>
            {
                users
                    ? (
                        <div>
                            <h1>Online:</h1>
                            <div className="activeUserList">
                                <h2>
                                    {users.map(({ name }) => (
                                        <div key={name} className="activeItem">
                                            {name}
                                            <img alt="Online Icon" src={onlineIcon}/>
                                        </div>
                                    ))}
                                </h2>
                            </div>
                        </div>
                    )
                    : null
            }
        </div>
    );
};

export default UserList;