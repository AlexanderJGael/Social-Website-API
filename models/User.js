const { Mongoose, Model } = require('mongoose');

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: {
            validator: v => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
            message: props => `${props.value} is not a valid email!`
        }
    },
    
    thoughts: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    },
);

module.exports = Mongoose.model('User', UserSchema);