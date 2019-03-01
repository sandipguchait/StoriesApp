import React from 'react';

import CKEditor from 'react-ckeditor-component';

import { withRouter } from  'react-router-dom';
import withAuth from '../withAuth';
import { Mutation } from 'react-apollo';
import { ADD_STORY, GET_ALL_STORIES} from  '../../Queries/index';

class AddStory extends React.Component {

    state = {
        name:'',
        imageUrl:'',
        category:'Horror',
        description:'',
        instructions:'',
        username:''
    };

    componentDidMount(){
        this.setState({
            username: this.props.session.getCurrentUser.username
        })
    }

    handleChange=(event)=> {
        const { name, value } = event.target;
        this.setState({ 
            [name]: value,
        });
    }

    handleEditorChange = event => {
        const newContent = event.editor.getData();
        this.setState({ instructions: newContent });
    }

    validateForm=()=> {
        const {name, imageUrl, category, description, instructions } = this.state;
        const isInvalid = !name || !category || !description || !instructions || !imageUrl ;
        return isInvalid;
    }

    handleSubmit=(event, addStory )=> {
        event.preventDefault();
        addStory().then(({data}) => {
            this.props.history.push('/');
            this.setState({
                name:'',
                category:'Horror',
                description:'',
                imageUrl:'',
                instructions:'',
                username:''
            })
        })
        
        
    }

    updateCache=(cache, {data:{addStory}})=>{
        const { getAllStory } = cache.readQuery({
            query: GET_ALL_STORIES
        })
        
        cache.writeQuery({
            query: GET_ALL_STORIES,
            data: {
                getAllStory: [addStory, ...getAllStory]
            }
        })
    }


    render(){
        const {name, imageUrl, category, description, instructions, username } = this.state;
        return (
        <Mutation mutation={ADD_STORY} variables={{ name, imageUrl, category, description, instructions, username  }}  update={this.updateCache}>
            {(addStory,{ data, loading , error })=> {

                return (
                    <div className="App">
                    <h2 className="App">Add Story</h2>
                    <form className="form" onSubmit={(event)=> this.handleSubmit(event, addStory)}>
                        <input type="text" name="name" placeholder="Story Name" value={name} onChange={this.handleChange}/>
                        <input type="text" name="imageUrl" placeholder="Story Image" value={imageUrl} onChange={this.handleChange}/>
                        <select name="category" value={category} onChange={this.handleChange}>
                            <option value="Thriller">Thriller</option>
                            <option value="Horror">Horror</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Romance">Romance</option>
                        </select>
                        <input type="text" name="description" placeholder="Add Description" value={description} onChange={this.handleChange}/>
                        <label htmlFor="instructions">Add Story</label>
                        <CKEditor
                           name="instructions"
                           content={instructions}
                           events={{ change: this.handleEditorChange }}
                        />
                        {/* <textarea name="instructions" placeholder="Add Your Story" rows="100" cols="80" value={instructions} onChange={this.handleChange}></textarea> */}
                        <button  disabled={ loading || this.validateForm() } type="submit" className="button-primary">Submit</button>
                        { error &&  <p>{error.message}</p>}
                    </form>
                    </div>
                )
            }
        }
        </Mutation>
       
       )
}

};

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddStory));