import React from 'react';
import {withRouter} from 'react-router-dom';

import  LikeStory  from './likeStory';
import Spinner from '../Spinner';
import { Query } from 'react-apollo';
import {GET_STORY} from '../../Queries/index';

const StoryPage = ({ match }) => {
    const {_id} = match.params;
    return (
        <Query query={GET_STORY} variables={{ _id }}>
        {({ data, loading , error })=> {
            if(loading) return <Spinner/>
            if(error) return <p>Error</p>
            return(
                <div className="App">
                    <div
                      style={{ background: `url(${data.getStory.imageUrl}) center center / cover no-repeat `}}
                      className="recipe-image"
                    ></div>
                    <div className="recipe">
                        <div className="recipe-header">
                        <h2 className="recipe-name">{data.getStory.name}</h2>
                        <h5><strong>{data.getStory.category}</strong></h5>
                        <p>
                            Created by <strong>{data.getStory.username}</strong>
                        </p>
                        <p>
                        {data.getStory.likes} <span role="img" aria-label="heart">❤️</span>
                        </p>
                        </div>
                        <blockquote className="recipe-description">
                        {data.getStory.description}
                        </blockquote>
                        <h3 className="recipe-instructions__title">Story</h3>
                        <div className="recipe-instructions" dangerouslySetInnerHTML={{ __html: data.getStory.instructions}}></div>
                    <LikeStory _id={_id}/>
                    </div>
                </div>
            )
        }}
        </Query>
    );
};

export default withRouter(StoryPage);