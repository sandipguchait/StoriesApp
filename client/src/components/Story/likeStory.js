import React from 'react'

import withSession from '../withSession';
import { Mutation } from 'react-apollo';

import { LIKE_STORY , GET_STORY , UNLIKE_STORY } from '../../Queries/index';

class LikeStory extends React.Component {

    state = {
        username: '',
        liked: false
    }
     
    componentDidMount(){
        if(this.props.session.getCurrentUser) {
            const { username, favorites } = this.props.session.getCurrentUser;
            const { _id } = this.props; 
            //check if it is previously liked or not
            const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1
            this.setState({
                username,
                liked: prevLiked
            })
        }
    }

    handleClick = ( likeStory, unlikeStory ) => {
        this.setState( prevState => ({
            liked: !prevState.liked
        }),()=> this.handleLike(likeStory, unlikeStory))
    }

    handleLike=( likeStory, unlikeStory )=>{
        if(this.state.liked) {
        likeStory().then(async({ data }) => {
            await this.props.refetch();
        });
      } else {
          // unlike feature 
          unlikeStory().then(async({ data }) => {
            await this.props.refetch();
        });
         
      } 
    }

    updateLike = (cache , {data: { likeStory }}) => {
        const { _id } = this.props;
        const { getStory } = cache.readQuery({ query: GET_STORY, variables: { _id } })

        cache.writeQuery({
            query: GET_STORY,
            variables: { _id },
            data: {
                getStory: {...getStory, likes: likeStory.likes + 1 }
            }
        })
    }

    updateUnlike = (cache , {data: { unlikeStory }}) => {
        const { _id } = this.props;
        const { getStory } = cache.readQuery({ query: GET_STORY, variables: { _id } })

        cache.writeQuery({
            query: GET_STORY,
            variables: { _id },
            data: {
                getStory: {...getStory, likes: unlikeStory.likes !== -1 && unlikeStory.likes -1 }
            }
        });
    }

    

    render(){
        const { liked, username } = this.state;
        const { _id } = this.props; 
        return (
        <Mutation 
            mutation={UNLIKE_STORY} 
            variables={{ _id, username }}
            update={this.updateUnlike}
        >
        {unlikeStory => (
        <Mutation 
           mutation={LIKE_STORY} 
           variables={{ _id, username}}
           update={this.updateLike}
        >
        {likeStory => (
                (username && <button className="like-button" onClick={()=>this.handleClick(likeStory,unlikeStory)}>
                { liked ? 'Unlike' : 'Like'}
                </button>)
            )
        }
        </Mutation>
        )}
        </Mutation>
    )}
}

export default withSession(LikeStory)