import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css'

const StoryItem = ({_id, imageUrl,  name , category}) => {
    return (
            <li
             style={{ background: `url(${imageUrl}) center center / cover no-repeat`}}
             className="card"
            >
            <span className={category}>{category}</span>
            <div className="card-text">
            <Link to={`/story/${_id}`}><h4>{name}</h4></Link>
            </div>
            </li>
    );
};

export default StoryItem;