const { Schema, Model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        getters: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = Model('Reaction', ReactionSchema);