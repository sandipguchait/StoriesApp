import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import {SIGNIN_USER} from '../../Queries/index';
import { withRouter } from 'react-router-dom';

const initialState = {
    username:'',
    password:'',
}

class Signin extends Component {

    state = {...initialState}

    handleChange =(event)=> {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit=(event, signinUser)=> {
        event.preventDefault();
        signinUser().then(async(data) => {
            localStorage.setItem('token', data.data.signinUser.token);
            await this.props.refetch();
            this.setState({...initialState})
            this.props.history.push('/')
        })
      
    }

    // VALIDATING THE FORM
    validateForm =()=> {
        const {username,  password} = this.state;
        const isInvalid = !username || !password 
        return isInvalid;
    }


    render() {
        const {username, password} = this.state;
        return (
            <div className="App">
            <h2 className="App">Signin</h2>
            <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
                {(signinUser,{ data, loading, error})=> {
                    if(loading) return <div>Loading...</div>
                    return(
                        <form className="form" onSubmit={(event)=>this.handleSubmit(event,signinUser)}>
                            <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
                            <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                            <button type="submit" disabled={loading || this.validateForm()} className="button-primary">Submit</button>
                            {error && <p>{error.message}</p>}
                        </form>
                    )
                }}
            </Mutation>
            </div>
        );
    }
}

export default withRouter(Signin);