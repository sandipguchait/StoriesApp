
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const createToken = (user, secret, expiresIn) => {
    const { username, email } = user
    return jwt.sign({ username, email}, secret , { expiresIn })
}

exports.resolvers = {

    //QUERIES
    Query: {
        getAllStory: async(root, args ,{ Story })=> {
            const allStory = await Story.find().sort({ createdDate: 'desc'});
            return allStory;
        },
        getStory: async(root, {_id}, { Story }) => {
            const story = await Story.findOne({ _id });
            return story;
        },
        searchStories: async(root, args,{ Story })=>{
           const searchStory = await Story.find().sort({ createdDate: 'desc' });
           return searchStory;
        },
        getUserStories: async (root, {username}, {Story}) => {
            const UserStories = await Story.find({ username }).sort({ createdDate: 'desc'})
            return UserStories;
        },
        
        getCurrentUser: async ( root, args, { currentUser, User }) => {
            if( !currentUser ) {
                return null;
            }
            const user = await User.findOne({ username: currentUser.username })
            .populate({
                path:'favorites',
                model: 'Story'
            });
            return user;
        }
    },

    //MUTATIONS 
    Mutation: {
        addStory: async ( root, { name, imageUrl, description, category, instructions, username }, { Story })=> {
            const newStory = await new Story({
                name , 
                imageUrl,
                description,
                category,
                instructions,
                username
            }).save();
            return newStory;
        },

        deleteStory: async ( root, { _id }, { Story }) => {
            const story = await Story.findOneAndRemove({ _id });
            return story;
        },

        likeStory: async ( root, { _id , username}, { Story, User})=> {
            const likes = await Story.findOneAndUpdate({ _id }, { $inc: { likes: +1}});
            const user = await User.findOneAndUpdate({ username }, { $pull: {favorites: _id}})
            likes.save();
            return likes;
        },

        unlikeStory: async ( root, { _id , username}, { Story, User})=> {
            const likes = await Story.findOneAndUpdate({ _id }, { $inc: { likes: -1}});
            const user = await User.findOneAndUpdate({ username }, { $addToSet: {favorites: _id}})
            likes.save();
            return likes;
        },

        signupUser: async ( root, { username, email , password }, { User }) => {
            const user = await User.findOne({ username });
            if( user ) {
                throw new Error('User already Exists ');
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return { token: createToken(newUser, process.env.SECRET, '1hr')};
        },

        signinUser: async (root, { username, password }, { User }) => {
            const user = await User.findOne({ username });
            if(!user) {
                throw new Error("User not found");
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) {
                throw new Error('Invalid password');
            }
            return { token: createToken(user, process.env.SECRET, '1hr')};
        }

    }
};