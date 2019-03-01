import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/App';

//components
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession';
import Navbar from './components/Navbar';
import Search from './components/Story/Search';
import AddStory from './components/Story/AddStory';
import Profile from './components/Profile/profile';
import StoryPage from './components/Story/StoryPage';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';




const client = new ApolloClient({
    uri:'https://your-story.herokuapp.com/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({ networkError}) => {
        if(networkError) {
            console.log('Network Error', networkError);
        }
    }
});

const Root =({refetch, session })=> (
    <BrowserRouter>
        <Fragment>
        <Navbar session={session} />
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/story/add" render={()=> <AddStory refetch={refetch} session={session} />}/>
                <Route exact path="/profile" render={()=> <Profile session={session}/>}/>
                <Route exact path="/story/:_id" component={StoryPage}/>
                <Route path="/signin" render={()=> <Signin refetch={refetch}/>}/>
                <Route path="/signup" render={()=> <Signup refetch={refetch}/>}/>
                <Redirect to="/"/>
            </Switch>
        </Fragment>
   </BrowserRouter>
)

const RootWithSession = withSession(Root); // with withsession it helps accessing propes to all its components

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>
, document.getElementById('root'));
