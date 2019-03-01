const mongoose = require ('mongoose');

const Schema = mongoose.Schema; // creating schema with mongoose 

const StorySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructions: {
        type:String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    likes: {
        type:Number,
        default: 0
    },
    username: {
        type: String
    }
});

StorySchema.index({
    '$**':'text'
});

module.exports = mongoose.model('Story',StorySchema );