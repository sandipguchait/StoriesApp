const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' }); // help us to bring different variables such as PORT and more
const  bodyParser = require('body-parser'); // acts as a middleware of schemas
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Bringing in GraphQl-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers')

//importing mongoose schema 
const Story = require("./models/Story");
const User = require("./models/User");

//Creating SCHEMA
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

mongoose // connecting server to mongoose database 
.connect(process.env.MONGO_URI)
.then(()=> console.log('DB connected'))
.catch(error => console.log(error));

// Initializes application
const app = express();

const corsOptions ={
    origin:'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));

// getting user auth token from clent to backend + set up JWT authentication middleware
app.use(async (req, res, next ) => {
    const token = req.headers['authorization'];
    if( token !== "null"){
        try{
          const currentUser = await jwt.verify(token, process.env.SECRET);  
          req.currentUser = currentUser;
        } catch(err){
            console.log(err);
        }
    }
    next();
});

//creating GraphiQl application 
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

//connect Schemas to graphQl
app.use('/graphql', bodyParser.json(), graphqlExpress(({ currentUser })=>({
    schema: schema,
    context:{
        Story,
        User,
        currentUser
    }
}))
);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'));
    })
}

const PORT = process.env.PORT || 4444;

app.listen(PORT,  ()=> {
    console.log(`server listening at ${PORT}`);
})