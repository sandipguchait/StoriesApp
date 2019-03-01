import React from 'react';
import './App.css';
import Spinner from './Spinner';

import { Query } from 'react-apollo';
import { GET_ALL_STORIES } from '../Queries/index';
import StoryItem from './Story/StoryItem';

const App = ()=> (
  <div className="App">
  <h1 className="main-title">
    Read Stories You <strong>Love</strong>
  </h1>
    <Query query={GET_ALL_STORIES}>
      {({data, loading , error})=> {
        if(loading ) return <Spinner/>
        if (error) return <div>Error</div>
        return (
          <ul className="cards">
          {data.getAllStory.map(story => <StoryItem key={story._id} {...story} />)}
          </ul>
        )
      }}
    </Query>
  </div>
)
export default App;
