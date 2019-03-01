import React from 'react';

import Spinner from '../Spinner';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import { SEARCH_QUERIES } from '../../Queries/index';

class Search extends React.Component {

    state = {
        stories: [],
        searchTerm:''
    }
    

    handleChange= (event, response) => {
       this.setState({
           searchTerm: event.target.value,
       })
       const result = response.filter(story => (
        story.name.toLowerCase().includes(event.target.value.toLowerCase())
        ))
      this.setState({ stories: result })
    }

    

    render(){
        const { searchTerm, stories } = this.state;
    return (
        <Query query={SEARCH_QUERIES}>
            {({data, loading, error})=>{
                if(loading) return <Spinner/>
                if(error) return <div>Error</div>
                const response = data.searchStories;
                return(
                    <div className="App">
                        <input 
                        type="search"
                        className="search"
                        placeholder="Search the term"
                        value={searchTerm}
                        onChange={(event)=>this.handleChange(event,response)}
                        />
                        <ul>
                            {stories.map(story => 
                                <li key={story._id}>
                                   <Link to={`story/${story._id}`}><h4>{story.name}</h4></Link> 
                                    <p>Likes: {story.likes}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                )
            }}
        </Query>
    );
   }
};

export default Search;