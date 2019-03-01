import React , {Fragment} from 'react';
import {NavLink } from 'react-router-dom'
import SignOut from './Auth/Signout';

const Navbar = ({ session }) => {
    return (
        <nav>
           { session && session.getCurrentUser ? <NavbarAuth session={session}/>: <NavbarUnAuth/>} 
        </nav>
    );
};

const NavbarAuth =({ session })=> (
    <Fragment>
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/story/add">Add Your Story</NavLink>
        </li>
        <li>
            <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
            <SignOut/>
        </li>
    </ul>
    <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
    </Fragment>
)

const NavbarUnAuth = () => (
   <ul>
       <li>
           <NavLink exact to="/">Home</NavLink>
       </li>
       <li>
           <NavLink to="/search">Search</NavLink>
       </li>
       <li>
           <NavLink to="/signin">Signin</NavLink>
       </li>
       <li>
           <NavLink to="/signup">Signup</NavLink>
       </li>
   </ul>
)
export default Navbar;

