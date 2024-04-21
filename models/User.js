const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            `{VALUE} is not a valid email!`
        ]
    },
    
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
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

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })
    .set(function (friendCount) {
        friendCount = this.friends.length;
        return friendCount;
    });

const User = model('User', userSchema);

module.exports = User;