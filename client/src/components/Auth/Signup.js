import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import {SIGNUP_USER} from '../../Queries/index';

const initialState = {
    username:'',
    email:'',
    password:'',
    passwordConfirmation:''
}

class Signup extends Component {

    state = {...initialState}

    handleChange =(event)=> {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit=(event, signupUser)=> {
        event.preventDefault();
        signupUser().then(async(data) => {
            localStorage.setItem("token", data.data.signupUser.token)
            await this.props.refetch();
            this.setState({...initialState})
            this.props.history.push('/');
        })
        
    }

    // VALIDATING THE FORM
    validateForm =()=> {
        const {username, email, password, passwordConfirmation} = this.state;
        const isInvalid = !username || !email || !password || password !== passwordConfirmation;
        return isInvalid;
    }


    render() {
        const {username, email, password, passwordConfirmation} = this.state;
        return (
            <div className="App">
            <h2 className="App">Signup</h2>
            <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
                {(signupUser,{ data, loading, error})=> {
                    if(loading) return <div>Loading...</div>
                    return(
                        <form className="form" onSubmit={(event)=>this.handleSubmit(event,signupUser)}>
                            <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
                            <input type="email" name="email" placeholder="Email Address" value={email} onChange={this.handleChange}/>
                            <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                            <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={passwordConfirmation} onChange={this.handleChange}/>
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

export default withRouter(Signup);