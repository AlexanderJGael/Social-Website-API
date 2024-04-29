const { ObjectId } = require('mongoose');
const { Thought, reactionSchema } = require('../models');

module.exports = {
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true },
            )

            if (!thought) {
                return res.status(404).json(`reaction not created`)
            }

            res.json('Reaction posted')
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.body.reactionId } } },
                { new: true }
            )

            if (!thought) {
                res.json(`Thought not found`)
            }

            res.json(`Reaction deleted`)
        } catch(e) {
            res.status(500).json(e);
        };
    },
};