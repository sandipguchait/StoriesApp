import React from 'react';
import {withRouter} from 'react-router-dom';

import { ApolloConsumer } from 'react-apollo';

const handleSignout =(client, history)=> {
    localStorage.setItem('token', '');
    client.resetStore();
    history.push("/");
}


const SignOut = ({history}) => {
    return (
        <ApolloConsumer>
            {client => {
                return (
                   <button className="signoutbtn" onClick={()=> handleSignout( client, history )}>Signout</button>
                )
            }}
        </ApolloConsumer>
    );
};

export default withRouter(SignOut);