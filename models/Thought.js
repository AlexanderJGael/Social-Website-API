const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        getters: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [Reaction],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;