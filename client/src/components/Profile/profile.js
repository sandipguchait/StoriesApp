import React from 'react';
import UserInfo from './UserInfo';
import UserStories from './UserStories';

import withAuth from '../withAuth';

const Profile = ({ session }) => {
    return (
        <div className="App">
            <UserInfo session={session}/>
            <UserStories session={session.getCurrentUser.username}/>
        </div>
    );
};

export default (withAuth(session => session && session.getCurrentUser)(Profile));