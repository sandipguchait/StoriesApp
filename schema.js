exports.typeDefs =`

type Story {
    _id: ID
    name: String!
    imageUrl: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String

}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Story]
}

type Query {
    getAllStory: [Story]
    getStory(_id:ID!): Story 
    getCurrentUser: User
    searchStories: [Story]

    getUserStories(username:String): [Story]
}

type Token {
    token: String!
}

type Mutation {
    addStory(name: String!, imageUrl: String!, description:String!, category: String!, instructions:String!, username: String): Story
    
    signupUser(username: String!, email: String!, password: String! ): Token

    signinUser(username: String! , password: String! ): Token

    deleteStory(_id: ID): Story

    likeStory(_id: ID!, username: String!): Story

    unlikeStory(_id: ID!, username: String!): Story
}

`;