import { gql } from 'apollo-boost';

//QUERIES
export const GET_ALL_STORIES = gql`
 query {
    getAllStory {
        _id
        imageUrl
        name
        category
    }
 }
`;

export const GET_CURRENT_USER = gql`
 query {
    getCurrentUser {
        username
        joinDate
        email
        favorites {
            _id
            name

        }
    }
 }
`;

export const GET_STORY = gql`
    query($_id:ID!){
        getStory(_id: $_id) {
        _id
        name
        imageUrl
        category
        description
        instructions
        createdDate
        likes
        username
        }
    }
`;

export const SEARCH_QUERIES = gql `
  query{
    searchStories {
        _id
        name
        likes
    }
  }
`;

export const GET_USER_STORIES = gql`
  query($username: String){
    getUserStories(username: $username){
        _id
        name
        likes
    }
  }
`

// MUTATIONS
export const  SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!){
        signupUser(username:$username,email:$email,password:$password){
        token
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!){
        signinUser(username: $username, password: $password ) {
        token
        }
    }
`;

export const ADD_STORY = gql`
    mutation($name: String!, $imageUrl: String!, $description:String!, $category: String!, $instructions:String!, $username: String) {
        addStory(name: $name, imageUrl: $imageUrl, description: $description, category: $category, instructions: $instructions, username: $username){
            _id
            name
            category
            description
            instructions
            createdDate
            likes
            username
        }
    }
`;

export const DELETE_STORY = gql`
    mutation($_id: ID){
        deleteStory(_id: $_id){
            _id
        }
    }
`

export const LIKE_STORY = gql`
 mutation($_id: ID!, $username: String!) {
     likeStory(_id: $_id, username: $username){
        _id
        likes
     }
 }
`
export const UNLIKE_STORY = gql`
 mutation($_id: ID!, $username: String!) {
     unlikeStory(_id: $_id, username: $username){
        _id
        likes
     }
 }
`
