import React from 'react';
import {Link} from 'react-router-dom';

const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-US');
    const newTime = new Date(date).toLocaleTimeString('en-US');
    return `${newDate} at ${newTime}`;
}

const UserInfo = ({ session }) => (
    <div>
       <h3><strong>User Info</strong> </h3>
       <p><strong>Username:</strong> {session.getCurrentUser.username}</p>
       <p><strong>Email:</strong> {session.getCurrentUser.email}</p>
       <p><strong>Join Date:</strong> {formatDate(session.getCurrentUser.joinDate)}</p>
       <ul>
           <h3>{session.getCurrentUser.username}'s Favorites</h3>
           {session.getCurrentUser.favorites.map(favorite => (
               <li key={favorite._id}>
                <Link to={`/story/#{favorite._id}`}><p>{favorite.name}</p></Link>
               </li>
           ))}
           {!session.getCurrentUser.favorites.length && <p>You have no favorites currently. Go add some!</p>}
       </ul>
    </div>
)

export default UserInfo;