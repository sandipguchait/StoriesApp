import React from 'react';

import {Link} from 'react-router-dom';
import Spinner from '../Spinner';

import { Query, Mutation } from 'react-apollo';
import { GET_USER_STORIES, DELETE_STORY } from '../../Queries/index';

const handleDelete = deleteStory => {
const confirmDelete = window.confirm('Are you sure you want to delete this story?');
if(confirmDelete) {
    deleteStory().then(({ data}) => {
        console.log(data)
    })
    }
}

const updateCache = (cache, {data:{deleteStory}} , username ) => {
   const { getUserStories } = cache.readQuery({
       query: GET_USER_STORIES,
       variables: { username }
   })
   cache.writeQuery({
       query: GET_USER_STORIES,
       variables: { username },
       data: {
        getUserStories: getUserStories.filter(story => (
            story._id !== deleteStory._id
        ))
       }
   })
}


const UserStories = ({ username }) => {
    return (
      <Query query={GET_USER_STORIES} variables={{ username }}>
        {({ data, loading, error})=>{
            if(loading) return <Spinner/>
            if(error) return <div>Error..</div>
            console.log(data, "session")
            return (
                <ul>
                    <h3><strong>Your Stories</strong></h3>
                    {!data.getUserStories.length && <p><strong>You have not added any Story yet</strong></p>}
                {data.getUserStories.map(story => (
                    <li key={story._id}>
                        <Link to={`/story/${story._id}`}><p>{story.name}</p></Link>
                        <p style={{ marginBottom: '0'}}>likes: {story.likes}</p>

                        {/* Mutation  */}
                        <Mutation mutation={DELETE_STORY} variables={{ _id: story._id }} update={()=>updateCache( username )}>
                        {(deleteStory, attrs ={})=>{
                            return(
                                <p className="delete-button" onClick={()=> handleDelete(deleteStory)}>
                                {attrs.loading ? 'deleting...' : 'X'}
                                </p>
                            )
                        }}
                        </Mutation>
                    </li>
                ))}
                </ul>
            )
        }}
      </Query>
    );
};

export default UserStories;